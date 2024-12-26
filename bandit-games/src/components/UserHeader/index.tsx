interface UserHeaderProps {
    coverPhoto: string;
    userPhoto: string;
    userName?: string;
}

export default function UserHeader({ coverPhoto, userPhoto, userName }: UserHeaderProps) {
    return (
        <div
            className="relative h-64 bg-cover bg-center"
            style={{ backgroundImage: `url('${coverPhoto}')` }}
        >
            {/* Profile Photo */}
            <div className="absolute -bottom-12 left-8">
                <img
                    src={userPhoto}
                    alt={`${userName || 'User'} Profile`}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
            </div>
        </div>
    )
}
