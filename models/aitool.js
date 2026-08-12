import { Schema, model, models } from "mongoose";

const ToolSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    tags: [
        {
            type: String,
        },
    ],
    pricing: {
        type: String, // e.g. "Free", "Paid", "Freemium", "Subscription"
        default: "Free",
    },
    features: [
        {
            type: String,
        },
    ],
    pros: [
        {
            type: String,
        },
    ],
    cons: [
        {
            type: String,
        },
    ],
    posted_by: {
        type: String,
        default: "",
    },
    posted_by_email: {
        type: String,
        default: "",
    },
    status: {
        type: Schema.Types.Mixed,
        default: "pending",
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    dataCreated: {
        type: Date,
        default: Date.now,
    },
});

ToolSchema.pre('validate', function (next) {
    if (this.name && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    next();
});


ToolSchema.virtual('id').get(function () {
    return this._id.toHexString()
});


ToolSchema.set('toJSON', {
    virtuals: true
})

const aitools = models.aitools || model('aitools', ToolSchema);

export default aitools;

export async function expandObjectByFunctionKey(functionKey) {

    const pipeline = [
        {
            $lookup: {
                from: 'functions',
                localField: 'functionKey',
                foreignField: '_id',
                as: 'function'
            }
        },
        {
            $unwind: '$function'
        }
    ];

    const result = await aitools.aggregate(pipeline).exec();
    return result;
}