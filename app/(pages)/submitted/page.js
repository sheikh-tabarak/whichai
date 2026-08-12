import React from 'react'
import { FiCheckCircle, FiPlus, FiHome } from 'react-icons/fi'
import Link from 'next/link'

export const metadata = {
    title: 'Submission Successful - Which AI',
    description: 'Thank you for submitting your tool to Which AI.',
};

const Submitted = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-2xl w-full text-center space-y-10 group">
                <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/40 transition-all duration-1000"></div>
                    <FiCheckCircle className="relative text-green-500 text-9xl animate-float" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter">
                        Submission Successful!
                    </h1>
                    <p className="text-slate-400 text-lg lg:text-xl max-w-md mx-auto leading-relaxed">
                        Your tool has been added to our queue. Our scouts will verify the details and publish it to the community within 24 hours.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href='/newtool'
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-black rounded-2xl hover:scale-105 transition-all shadow-xl"
                    >
                        <FiPlus /> Submit Another
                    </Link>
                    <Link
                        href='/'
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white border border-white/10 font-bold rounded-2xl hover:bg-slate-800 transition-all"
                    >
                        <FiHome /> Back to Home
                    </Link>
                </div>

                <div className="pt-10">
                    <p className="text-slate-600 text-sm font-medium uppercase tracking-[0.2em]">
                        Empowering the AI community together
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Submitted