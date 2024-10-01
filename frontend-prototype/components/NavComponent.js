function NavComponent({icon, text}) {
    return (
        // Nav component (button with icon and text) for the drawer
        <div className="mt-2">
            <button className="btn btn-wide btn-ghost flex flex-col items-start justify-center">
                {/* Background for icons */}
                <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
                {icon}
                </div>
                <span className="px-2 text-white text-xl">{text}</span>
            </button>
        </div>
    )
}

export default NavComponent

