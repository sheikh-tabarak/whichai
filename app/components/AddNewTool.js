'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiXCircle, FiPlus, FiTrash2, FiInfo, FiDollarSign, FiZap } from "react-icons/fi";
import ToolCard from '@/app/components/ToolCard';
import { useRouter } from 'next/navigation';

const AddNewTool = () => {
    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [features, setFeatures] = useState([]);
    const [newFeature, setNewFeature] = useState('');
    const [pros, setPros] = useState([]);
    const [newPro, setNewPro] = useState('');
    const [cons, setCons] = useState([]);
    const [newCon, setNewCon] = useState('');

    const [CurrentTool, setCurrentTool] = useState({
        name: '',
        description: '',
        longDescription: '',
        link: '',
        image: '',
        tags: [],
        features: [],
        pros: [],
        cons: [],
        pricing: 'Free',
        posted_by: '',
        posted_by_email: '',
        category: ''
    });

    useEffect(() => {
        axios.get('/api/categories').then(res => setCategories(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        setCurrentTool(prev => ({ ...prev, tags, features, pros, cons }));
    }, [tags, features, pros, cons]);

    // Input Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTool({ ...CurrentTool, [name]: value });
    };

    // List Management Helpers
    const addItem = (list, setList, value, setValue) => {
        if (value.trim()) {
            setList([...list, value.trim()]);
            setValue('');
        }
    };

    const removeItem = (list, setList, index) => {
        setList(list.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/aitool', CurrentTool)
            .then(res => res.data.ok && router.replace('/submitted'))
            .catch(console.error);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-44 lg:pt-48 pb-20 lg:pb-32">
            <div className="w-[95%] max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">

                    {/* Form Side */}
                    <div className="lg:w-2/3 space-y-8 lg:space-y-16">
                        <div className="space-y-4 lg:space-y-6 border-b border-white/5 pb-6 lg:pb-10">
                            <h1 className="text-3xl lg:text-7xl font-black text-white tracking-tighter">Submit Your AI Tool</h1>
                            <p className="text-slate-400 text-base lg:text-xl leading-relaxed max-w-2xl font-medium">
                                Join the world's most comprehensive AI directory. <span className="text-blue-400">Provide detailed information</span> to help users understand the value of your tool.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-16">
                            {/* Basic Info Section */}
                            <section className="space-y-8">
                                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                                    <div className="p-2 bg-blue-600/10 rounded-lg text-blue-400"><FiInfo /></div> Basic Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Tool Name *</label>
                                        <input
                                            name="name" value={CurrentTool.name} onChange={handleInputChange} required
                                            placeholder="e.g. Midjourney"
                                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder:text-slate-600"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Category *</label>
                                        <div className="relative">
                                            <select
                                                name="category" value={CurrentTool.category} onChange={handleInputChange} required
                                                className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <FiZap />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Pricing *</label>
                                        <div className="relative">
                                            <select
                                                name="pricing" value={CurrentTool.pricing} onChange={handleInputChange}
                                                className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="Free">Free</option>
                                                <option value="Freemium">Freemium</option>
                                                <option value="Paid">Paid</option>
                                                <option value="Subscription">Subscription</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <FiDollarSign />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Website URL *</label>
                                        <input
                                            name="link" value={CurrentTool.link} onChange={handleInputChange} required
                                            placeholder="https://example.com"
                                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder:text-slate-600"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 group">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Short Description *</label>
                                    <input
                                        name="description" value={CurrentTool.description} onChange={handleInputChange} required
                                        placeholder="One clear sentence about what this tool does."
                                        className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="space-y-3 group">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Detailed Overview</label>
                                    <textarea
                                        name="longDescription" value={CurrentTool.longDescription} onChange={handleInputChange}
                                        placeholder="Provide a deep dive into your tool's capabilities, use cases, and unique advantages..."
                                        rows={8}
                                        className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder:text-slate-600 leading-relaxed"
                                    />
                                </div>
                            </section>

                            {/* Dynamic Lists Section */}
                            <section className="space-y-12 pt-10 border-t border-white/5">
                                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                                    <div className="p-2 bg-purple-600/10 rounded-lg text-purple-400"><FiZap /></div> Features & Capabilities
                                </h3>

                                <div className="grid md:grid-cols-2 gap-12">
                                    {/* Features */}
                                    <div className="space-y-6">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex justify-between">
                                            Key Features <span className="text-purple-400">{features.length} Added</span>
                                        </label>
                                        <div className="flex gap-3">
                                            <input
                                                value={newFeature} onChange={e => setNewFeature(e.target.value)}
                                                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem(features, setFeatures, newFeature, setNewFeature))}
                                                placeholder="Add feature..."
                                                className="flex-grow bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:outline-none text-sm font-medium"
                                            />
                                            <button type="button" onClick={() => addItem(features, setFeatures, newFeature, setNewFeature)} className="px-6 bg-purple-600 hover:bg-purple-500 rounded-xl text-white transition-colors font-bold"><FiPlus /></button>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {features.map((f, i) => (
                                                <span key={i} className="flex items-center gap-3 pl-4 pr-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm font-bold text-slate-300 group">
                                                    {f} <button type="button" onClick={() => removeItem(features, setFeatures, i)} className="p-1 hover:bg-red-500/20 rounded-lg text-slate-500 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="space-y-6">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex justify-between">
                                            Search Tags <span className="text-blue-400">{tags.length} Added</span>
                                        </label>
                                        <div className="flex gap-3">
                                            <input
                                                value={newTag} onChange={e => setNewTag(e.target.value)}
                                                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem(tags, setTags, newTag, setNewTag))}
                                                placeholder="Add tag..."
                                                className="flex-grow bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none text-sm font-medium"
                                            />
                                            <button type="button" onClick={() => addItem(tags, setTags, newTag, setNewTag)} className="px-6 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors font-bold"><FiPlus /></button>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {tags.map((t, i) => (
                                                <span key={i} className="flex items-center gap-3 pl-4 pr-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm font-bold text-slate-300 group">
                                                    #{t} <button type="button" onClick={() => removeItem(tags, setTags, i)} className="p-1 hover:bg-red-500/20 rounded-lg text-slate-500 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="grid md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
                                {/* Pros */}
                                <div className="space-y-6">
                                    <label className="text-xs font-black text-green-500 uppercase tracking-widest">Operational Pros</label>
                                    <div className="flex gap-3">
                                        <input
                                            value={newPro} onChange={e => setNewPro(e.target.value)}
                                            onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem(pros, setPros, newPro, setNewPro))}
                                            placeholder="Add pro..."
                                            className="flex-grow bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-green-500 focus:outline-none text-sm font-medium"
                                        />
                                        <button type="button" onClick={() => addItem(pros, setPros, newPro, setNewPro)} className="px-6 bg-green-600 hover:bg-green-500 rounded-xl text-white transition-colors font-bold"><FiPlus /></button>
                                    </div>
                                    <ul className="space-y-3">
                                        {pros.map((p, i) => (
                                            <li key={i} className="flex items-center justify-between p-4 bg-green-900/10 rounded-2xl border border-green-500/10">
                                                <span className="text-sm font-medium text-green-200">{p}</span>
                                                <FiTrash2 className="text-green-500/50 hover:text-red-400 cursor-pointer transition-colors" onClick={() => removeItem(pros, setPros, i)} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Cons */}
                                <div className="space-y-6">
                                    <label className="text-xs font-black text-red-500 uppercase tracking-widest">System Limitations</label>
                                    <div className="flex gap-3">
                                        <input
                                            value={newCon} onChange={e => setNewCon(e.target.value)}
                                            onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem(cons, setCons, newCon, setNewCon))}
                                            placeholder="Add con..."
                                            className="flex-grow bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 focus:outline-none text-sm font-medium"
                                        />
                                        <button type="button" onClick={() => addItem(cons, setCons, newCon, setNewCon)} className="px-6 bg-red-600 hover:bg-red-500 rounded-xl text-white transition-colors font-bold"><FiPlus /></button>
                                    </div>
                                    <ul className="space-y-3">
                                        {cons.map((c, i) => (
                                            <li key={i} className="flex items-center justify-between p-4 bg-red-900/10 rounded-2xl border border-red-500/10">
                                                <span className="text-sm font-medium text-red-200">{c}</span>
                                                <FiTrash2 className="text-red-500/50 hover:text-red-400 cursor-pointer transition-colors" onClick={() => removeItem(cons, setCons, i)} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Credits Section */}
                            <section className="space-y-8 pt-10 border-t border-white/5">
                                <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                    <span className="w-8 h-px bg-slate-700"></span> Submitter Details
                                </h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Your Name *</label>
                                        <input
                                            name="posted_by" value={CurrentTool.posted_by} onChange={handleInputChange} required
                                            placeholder="For credits"
                                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Your Email *</label>
                                        <input
                                            name="posted_by_email" value={CurrentTool.posted_by_email} onChange={handleInputChange} required type="email"
                                            placeholder="Only visible to admin"
                                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </section>

                            <button
                                type="submit"
                                className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-xl rounded-[24px] shadow-2xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.01] transition-all active:scale-[0.99] border border-white/10 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Submit Tool <FiZap className="group-hover:text-yellow-300 transition-colors" />
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                        </form>
                    </div>

                    {/* Preview Side */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-40 space-y-8">
                            <h3 className="text-center text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center justify-center gap-4">
                                <span className="w-8 h-px bg-slate-800"></span> Live Preview <span className="w-8 h-px bg-slate-800"></span>
                            </h3>
                            <div className="flex justify-center scale-95 origin-top transition-transform duration-500">
                                <ToolCard tool={CurrentTool} preview={true} />
                            </div>
                            <div className="p-8 bg-slate-900/50 border border-white/10 rounded-[32px] space-y-6 backdrop-blur-xl">
                                <div className="flex items-center gap-3 text-white font-black">
                                    <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><FiCheckCircle /></div>
                                    <span>Submission Checklist</span>
                                </div>
                                <ul className="space-y-4 text-xs font-bold text-slate-500">
                                    <li className={CurrentTool.name ? 'text-green-400 flex items-center gap-3 transition-colors' : 'flex items-center gap-3 transition-colors'}><div className={`w-2 h-2 rounded-full ${CurrentTool.name ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-slate-700'}`}></div> Name provided</li>
                                    <li className={CurrentTool.link ? 'text-green-400 flex items-center gap-3 transition-colors' : 'flex items-center gap-3 transition-colors'}><div className={`w-2 h-2 rounded-full ${CurrentTool.link ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-slate-700'}`}></div> Website link active</li>
                                    <li className={CurrentTool.category ? 'text-green-400 flex items-center gap-3 transition-colors' : 'flex items-center gap-3 transition-colors'}><div className={`w-2 h-2 rounded-full ${CurrentTool.category ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-slate-700'}`}></div> Category selected</li>
                                    <li className={CurrentTool.description ? 'text-green-400 flex items-center gap-3 transition-colors' : 'flex items-center gap-3 transition-colors'}><div className={`w-2 h-2 rounded-full ${CurrentTool.description ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-slate-700'}`}></div> Description looks good</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddNewTool;
