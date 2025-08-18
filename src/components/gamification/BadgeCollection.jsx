import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Button from '../shared/Button';
import { CheckCircle } from 'lucide-react';

const badges = [
	{
		id: 1,
		name: 'Profile Master',
		description: 'Complete 100% of your profile',
		icon: '👤',
		rarity: 'common',
		earned: true,
		earnedDate: '2023-12-01',
	},
	{
		id: 2,
		name: 'Job Hunter',
		description: 'Apply to 10 jobs',
		icon: '🎯',
		rarity: 'common',
		earned: true,
		earnedDate: '2023-12-05',
	},
	{
		id: 3,
		name: 'Skill Collector',
		description: 'Add 20 skills to your profile',
		icon: '🛠️',
		rarity: 'rare',
		earned: true,
		earnedDate: '2023-12-10',
	},
	{
		id: 4,
		name: 'Network Builder',
		description: 'Connect with 50 professionals',
		icon: '🤝',
		rarity: 'rare',
		earned: false,
		progress: 32,
		total: 50,
	},
	{
		id: 5,
		name: 'Assessment Ace',
		description: 'Complete 5 skill assessments with 90%+ score',
		icon: '🏆',
		rarity: 'epic',
		earned: false,
		progress: 2,
		total: 5,
	},
	{
		id: 6,
		name: 'Career Legend',
		description: 'Reach level 20',
		icon: '⭐',
		rarity: 'legendary',
		earned: false,
		progress: 7,
		total: 20,
	},
];

export default function BadgeCollection({ userId }) {
	const [showAll, setShowAll] = useState(false);
	const [recentBadge, setRecentBadge] = useState(null);

	const displayedBadges = showAll ? badges : badges.slice(0, 6);
	const earnedCount = badges.filter((badge) => badge.earned).length;

	const getRarityColor = (rarity) => {
		switch (rarity) {
			case 'common':
				return 'bg-gray-100 text-gray-700';
			case 'rare':
				return 'bg-blue-100 text-blue-700';
			case 'epic':
				return 'bg-purple-100 text-purple-700';
			case 'legendary':
				return 'bg-yellow-100 text-yellow-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	};

	const getRarityBorder = (rarity) => {
		switch (rarity) {
			case 'common':
				return 'border-gray-200';
			case 'rare':
				return 'border-blue-100';
			case 'epic':
				return 'border-purple-100';
			case 'legendary':
				return 'border-yellow-100';
			default:
				return 'border-gray-200';
		}
	};

	return (
		<Card className="bg-white text-card-foreground border border-gray-100 shadow-sm">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-[var(--ebony-900)] flex items-center gap-2">
						🏅 Badge Collection
						<Badge className="bg-emerald-100 text-emerald-700">
							{earnedCount}/{badges.length}
						</Badge>
					</CardTitle>
				</div>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
					{displayedBadges.map((badge) => (
						<div
							key={badge.id}
							className={`relative group cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
								badge.earned ? '' : 'opacity-80'
							}`}
							onClick={() => badge.earned && setRecentBadge(badge.id)}
						>
							<div
								className={`p-4 rounded-xl border ${
									badge.earned ? getRarityBorder(badge.rarity) : 'border-gray-200'
								} ${badge.earned ? 'bg-white' : 'bg-gray-50'} shadow-sm`}
							>
								<div className="text-center">
									<div className="text-3xl mb-2 relative inline-block">
										<span
											className={`inline-flex items-center justify-center w-12 h-12 rounded-md ${
												badge.earned
													? 'bg-emerald-50 text-emerald-700'
													: 'bg-gray-100 text-gray-600'
											} text-xl`}
										>
											{badge.earned ? badge.icon : '🔒'}
										</span>
										{badge.earned && (
											<div className="absolute -top-1 -right-1">
												<CheckCircle className="h-4 w-4 text-emerald-500" />
											</div>
										)}
									</div>

									<h4 className="font-semibold text-sm text-[var(--ebony-900)] mb-1">
										{badge.name}
									</h4>
									<div className="flex items-center justify-center mb-2">
										<Badge
											className={`text-xs ${getRarityColor(badge.rarity)} border-0`}
										>
											{badge.rarity}
										</Badge>
									</div>

									{!badge.earned && badge.progress !== undefined && (
										<div className="text-xs text-gray-500">
											{badge.progress}/{badge.total}
										</div>
									)}
								</div>

								{/* Hover tooltip */}
								<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
									<div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
										{badge.description}
										{badge.earned && badge.earnedDate && (
											<div className="text-gray-300 text-xs mt-1">
												Earned: {new Date(badge.earnedDate).toLocaleDateString()}
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Unlock animation */}
							{recentBadge === badge.id && (
								<div className="absolute inset-0 pointer-events-none">
									<div className="absolute inset-0 bg-yellow-400/10 rounded-xl animate-ping"></div>
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-bounce">
										✨
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				{badges.length > 6 && (
					<div className="mt-4 text-center">
						<Button
							variant="outline"
							onClick={() => setShowAll(!showAll)}
							className="border-gray-200 text-gray-700 hover:bg-gray-50"
						>
							{showAll ? 'Show Less' : `Show All ${badges.length} Badges`}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
