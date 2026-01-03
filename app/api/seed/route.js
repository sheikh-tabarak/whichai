import { NextResponse } from "next/server";
import dbConnect from "../server";
import aitools from "@/models/aitool";
import categories from "@/models/categories";

export async function GET(request) {
    await dbConnect();

    try {
        const allCategories = await categories.find({});
        const catMap = {};
        allCategories.forEach(c => catMap[c.name] = c._id);

        const getCatId = (namePart) => {
            for (const name in catMap) {
                if (name.toLowerCase().includes(namePart.toLowerCase())) return catMap[name];
            }
            // Fallback for tricky names
            if (namePart === 'IoT') return catMap['Smart Home and IoT AI'];
            if (namePart === 'ML') return catMap['Machine Learning'];
            if (namePart === 'NLP') return catMap['Natural Language Processing (NLP)'];
            if (namePart === 'Assistant') return catMap['Virtual Assistants and Automation'];
            return null;
        };

        const rawTools = [
            // --- SMART HOME & IoT ---
            {
                name: "Ecobee",
                description: "Smart thermostat that uses AI to learn your schedule and save energy.",
                link: "https://www.ecobee.com",
                catKey: "IoT",
                pricing: "Paid",
                tags: ["Smart Home", "Energy", "IoT"],
                pros: ["Saves money", "Works with Alexa/HomeKit", "Easy install"],
                cons: ["Hardware cost", "Requires wifi"],
                features: ["Smart sensors", "Energy reports", "Voice control"]
            },
            {
                name: "Josh.ai",
                description: "Privacy-focused home automation system with natural voice control.",
                link: "https://www.josh.ai",
                catKey: "IoT",
                pricing: "Paid",
                tags: ["Privacy", "Voice", "Luxury"],
                pros: ["Your data stays local", "Natural conversation", "Premium integration"],
                cons: ["Expensive", "Requires professional install"],
                features: ["Whole home control", "Context awareness", "Privacy guard"]
            },
            {
                name: "Google Nest",
                description: "A home that takes care of the people inside it and the world around it.",
                link: "https://store.google.com/category/connected_home",
                catKey: "IoT",
                pricing: "Paid",
                tags: ["Google", "Home"],
                pros: ["Ecosystem integration", "Sleek design", "AI cameras"],
                cons: ["Google privacy concerns", "Locked ecosystem"],
                features: ["Face recognition", "Activity zones", "Automation"]
            },

            // --- VIRTUAL ASSISTANTS ---
            {
                name: "Siri",
                description: "Apple's intelligent personal assistant.",
                link: "https://www.apple.com/siri/",
                catKey: "Assistant",
                pricing: "Free",
                tags: ["Apple", "Voice", "Mobile"],
                pros: ["Deep iOS integration", "Privacy focus", "Always available"],
                cons: ["Can be dumb", "Locked to Apple"],
                features: ["Shortcuts", "HomeKit", "Suggestions"]
            },
            {
                name: "Motion",
                description: "Schedules your day automatically. The AI executive assistant.",
                link: "https://www.usemotion.com",
                catKey: "Assistant",
                pricing: "Paid",
                tags: ["Calendar", "Productivity"],
                pros: ["Auto-scheduling", "Project management", "Focus time"],
                cons: ["Expensive subscription", "High learning curve"],
                features: ["Intelligent calendar", "Task manager", "Booking links"]
            },
            {
                name: "Trevor AI",
                description: "Plan your day with AI. The time blocking app that works.",
                link: "https://www.trevorai.com",
                catKey: "Assistant",
                pricing: "Freemium",
                tags: ["Time Blocking", "Planning"],
                pros: ["Visual planning", "Syncs with Todoist", "Smart suggestions"],
                cons: ["UI is simple", "Limited free tier"],
                features: ["Time blocking", "Calendar sync", "Duration estimates"]
            },

            // --- MACHINE LEARNING PLATFORMS ---
            {
                name: "TensorFlow",
                description: "An end-to-end open source machine learning platform by Google.",
                link: "https://www.tensorflow.org",
                catKey: "Machine Learning",
                pricing: "Free",
                tags: ["Dev", "Library", "Google"],
                pros: ["Industry standard", "Huge ecosystem", "Deployment tools"],
                cons: ["Steep learning curve", "Verbose API"],
                features: ["Keras API", "TensorBoard", "TF Lite"]
            },
            {
                name: "PyTorch",
                description: "An open source machine learning framework that accelerates the path from research prototyping to production deployment.",
                link: "https://pytorch.org",
                catKey: "Machine Learning",
                pricing: "Free",
                tags: ["Facebook", "Research", "Dev"],
                pros: ["Pythonic", "Flexible", "Loved by researchers"],
                cons: ["Deployment used to be hard", "Mobile support"],
                features: ["TorchScript", "Distributed training", "Dynamic graph"]
            },
            {
                name: "H2O.ai",
                description: "The leading open source generative AI and machine learning platform.",
                link: "https://h2o.ai",
                catKey: "Machine Learning",
                pricing: "Freemium",
                tags: ["AutoML", "Enterprise"],
                pros: ["Driverless AI", "No-code options", "Enterprise support"],
                cons: ["Expensive enterprise", "Resource heavy"],
                features: ["AutoML", "Feature engineering", "Model interpretability"]
            },

            // --- RECOMMENDATION SYSTEMS ---
            {
                name: "Algolia",
                description: "The world's only end-to-end AI Search and Discovery platform.",
                link: "https://www.algolia.com",
                catKey: "Recommendation",
                pricing: "Paid",
                tags: ["Search", "API", "E-commerce"],
                pros: ["Incredibly fast", "Great DX", "AI re-ranking"],
                cons: ["Expensive at scale", "Complex config"],
                features: ["NeuralSearch", "Personalization", "Analytics"]
            },
            {
                name: "Crossing Minds",
                description: "The smartest recommendation platform for e-commerce and content.",
                link: "https://www.crossingminds.com",
                catKey: "Recommendation",
                pricing: "Paid",
                tags: ["B2B", "E-commerce"],
                pros: ["Cookie-less", "High accuracy", "Easy integration"],
                cons: ["B2B only", "Cost"],
                features: ["Behavioral prediction", "Real-time", "Shopify app"]
            },
            {
                name: "Recombee",
                description: "Real-time AI recommendation engine via API.",
                link: "https://www.recombee.com",
                catKey: "Recommendation",
                pricing: "Paid",
                tags: ["API", "Dev", "SaaS"],
                pros: ["Flexible", "Multiple scenarios", "Real-time"],
                cons: ["Requires dev work", "Pricing tiers"],
                features: ["Personalized search", "Related items", "Business rules"]
            }
        ];

        let count = 0;
        let missingCats = [];

        for (const toolData of rawTools) {
            const existing = await aitools.findOne({ name: toolData.name });
            if (!existing) {
                const catId = getCatId(toolData.catKey);

                if (catId) {
                    await aitools.create({
                        ...toolData,
                        category: catId,
                        slug: toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        longDescription: toolData.description,
                        features: toolData.features || ["AI Powered"],
                        pros: toolData.pros || [],
                        cons: toolData.cons || [],
                        isVerified: true,
                        status: true,
                        posted_by: "Admin",
                        pricing: toolData.pricing || "Freemium",
                        rating: (4.0 + (Math.random() * 1.0)).toFixed(1)
                    });
                    count++;
                } else {
                    missingCats.push(toolData.catKey);
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${count} tools into niche categories.`,
            missing_categories: [...new Set(missingCats)]
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
