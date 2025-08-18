import React from "react";
import { Star, StarHalf } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "./ui/card";

const stories = [
	{
		name: "Akosua Mensah",
		role: "Software Developer",
		avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=512&h=512&fit=crop&q=80",
		quote:
			"Ghana Talent Hub helped me find a remote software development position that doubled my previous salary. The CV builder and interview coaching were game-changers!",
		rating: 5,
	},
	{
		name: "Kofi Adu",
		role: "Marketing Specialist",
		avatar: "https://images.unsplash.com/photo-1545996124-1f9b4a5d6d2b?w=512&h=512&fit=crop&q=80",
		quote:
			"After struggling to find work for months, I found my perfect marketing role within two weeks of joining Ghana Talent Hub. The job matching algorithm is incredibly accurate!",
		rating: 4.5,
	},
	{
		name: "Ama Darko",
		role: "Accountant",
		avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=512&h=512&fit=crop&q=80",
		quote:
			"The career coaching helped me transition from a junior to senior accountant position. I'm now earning more and have better work-life balance. Thank you, Ghana Talent Hub!",
		rating: 5,
	},
];

const renderStars = (rating) => {
	const full = Math.floor(rating);
	const half = rating % 1 >= 0.5;
	const stars = [];

	for (let i = 0; i < full; i++) {
		stars.push(<Star key={`s-full-${i}`} className="w-4 h-4 text-yellow-400 inline-block mr-1" />);
	}
	if (half) {
		stars.push(<StarHalf key="s-half" className="w-4 h-4 text-yellow-400 inline-block mr-1" />);
	}
	// fill to 5 with empty (lighter) stars for consistent layout
	const remaining = 5 - full - (half ? 1 : 0);
	for (let i = 0; i < remaining; i++) {
		stars.push(<Star key={`s-empty-${i}`} className="w-4 h-4 text-yellow-200 inline-block mr-1" />);
	}
	return stars;
};

const SuccessStories = () => {
	return (
		<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
			<div className="text-center mb-8">
				<h2
					className="text-2xl font-bold text-[var(--ebony-50)]"
					style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
				>
					Success Stories
				</h2>
				<p
					className="mt-3 text-[var(--river-bed)]"
					style={{ fontSize: "clamp(.9rem, 1.6vw, 1rem)" }}
				>
					Hear from youth who found their dream jobs through Ghana Talent Hub.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{stories.map((s, i) => (
					<Card key={i} className="rounded-xl  shadow-lg">
						<CardHeader className="p-0">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
									<img
										src={s.avatar}
										alt={`${s.name} avatar`}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="min-w-0">
									<CardTitle
										className="text-[var(--ebony-50)] text-left font-semibold"
										style={{
											fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
											marginBottom: "clamp(6px, 1vw, 12px)",
										}}
									>
										{s.name}
									</CardTitle>
									<CardDescription
										className="text-[var(--ebony-600)] text-left"
										style={{ fontSize: "clamp(.85rem, 1.2vw, .95rem)" }}
									>
										{s.role}
									</CardDescription>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-0 pt-4">
							<p
								className="text-gray-700 leading-relaxed text-left"
								style={{ fontSize: "clamp(.95rem, 1vw, 1rem)" }}
							>
								&ldquo;{s.quote}&rdquo;
							</p>
						</CardContent>

						<CardFooter className="pt-0">
							<div className="flex items-center justify-between">
								<div className="flex gap-1">{renderStars(s.rating)}</div>
								<a
									href="#"
									className="text-sm font-medium text-[var(--primary-600)] hover:underline"
								>
									Read more
								</a>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
};

export default SuccessStories;