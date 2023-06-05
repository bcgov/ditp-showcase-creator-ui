

export const NavBarButton = ({ icon, title }) => {
    return (
        <div className="w-400">

            <li className="flex flex-col items-center gap-3 p-3 bg-red-800 rounded-b-lg">

                <div className="w-52 h-41 bg-black">
                    <img src={icon} alt={title} className="w-6 h-6 text-xs text-gray-500" />
                </div>


                <p className="font-bold text-xs leading-14 text-center tracking-tighter text-white">
                    {title}
                </p>
            </li>
        </div>
    )
}
