import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

const features = [
	{
		title: "Smart CV Builder",
		desc: "Create a professional CV that stands out to employers with our easy-to-use builder.",
		color: "bg-blue-100",
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
				<path
					d="M7 7h10M7 11h10M7 15h6"
					stroke="#2563eb"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<rect
					x="3"
					y="3"
					width="18"
					height="18"
					rx="2"
					stroke="#bfdbfe"
					strokeWidth="0"
					fill="none"
				/>
			</svg>
		),
	},
	{
		title: "Job Matching",
		desc: "Our AI matches your skills and experience with the perfect job opportunities.",
		color: "bg-green-100",
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
				<path
					d="M12 2v20M2 12h20"
					stroke="#059669"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: "Career Coaching",
		desc: "Get personalized advice from industry experts to advance your career goals.",
		color: "bg-yellow-100",
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
				<path
					d="M12 14c3 0 5-1.5 5-4s-2-4-5-4-5 1.5-5 4 2 4 5 4z"
					stroke="#d97706"
					strokeWidth="1.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6 21v-1a4 4 0 014-4h4a4 4 0 014 4v1"
					stroke="#d97706"
					strokeWidth="1.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: "Interview Practice",
		desc: "Prepare for interviews with our AI‑powered practice sessions and feedback.",
		color: "bg-purple-100",
		icon: (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
				<path
					d="M21 15a2 2 0 01-2 2H9l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"
					stroke="#8b5cf6"
					strokeWidth="1.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
];

const EmpoweringYouthSection = () => {
	return (
		<section
			aria-labelledby="empowering-title"
			className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12"
			style={{
				paddingLeft: "clamp(1rem, 4vw, 3rem)",
				paddingRight: "clamp(1rem, 4vw, 3rem)",
			}}
		>
			<div className="text-center max-w-3xl mx-auto mb-8">
				<h2
					id="empowering-title"
					className="font-semibold text-[var(--ebony-50)]"
					style={{ fontSize: "clamp(1.25rem, 3.2vw, 2rem)" }}
				>
					Empowering Youth with Career Tools
				</h2>
				<p
					className="mt-3 text-[var(--river-bed)]"
					style={{ fontSize: "clamp(.9rem, 1.6vw, 1rem)" }}
				>
					Everything you need to launch and advance your career in Ghana's
					competitive job market.
				</p>
			</div>

			<div
				className="grid gap-6"
				style={{
					gridTemplateColumns: "repeat(1, minmax(0,1fr))",
				}}
			>
				<div
					className="grid gap-6"
					style={{
						gridTemplateColumns: "repeat(1, minmax(0,1fr))",
					}}
				>
					{/* responsive: 1 col small, 2 cols md, 4 cols lg */}
					<div
						className="grid gap-6"
						style={{
							gridTemplateColumns: "repeat(1, minmax(0,1fr))",
						}}
					>
						<div
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
							role="list"
						>
							{features.map((f, i) => (
								<Card key={i} className="bg-white rounded-xl p-2 shadow-lg">
									<CardHeader className="p-0">
										{/* stacked: icon above, text centered below */}
										<div className="flex flex-col items-start  gap-4">
											<div
												className={`${f.color} rounded-lg flex items-center justify-center`}
												style={{
													width: "clamp(44px, 7vw, 56px)",
													height: "clamp(44px, 7vw, 56px)",
													flexShrink: 0,
												}}
												aria-hidden="true"
											>
												{f.icon}
											</div>

											<div>
												<CardTitle
													className="text-[var(--ebony-900)] font-semibold"
													style={{
														fontSize: "clamp(1rem, 1.8vw, 1.125rem)",
														marginBottom: "clamp(8px, 1.2vw, 12px)",
													}}
												>
													{f.title}
												</CardTitle>
												<CardDescription
													className="text-[var(--ebony-600)]"
													style={{ fontSize: "clamp(.85rem, 1.4vw, .95rem)" }}
												>
													{f.desc}
												</CardDescription>
											</div>
										</div>
									</CardHeader>
								</Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EmpoweringYouthSection;