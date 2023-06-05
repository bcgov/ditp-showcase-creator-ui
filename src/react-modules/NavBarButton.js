

export const NavBarButton = ({ src, title }) => {
    return (
        

            <li className="flex flex-col align items justify-between p-3  rounded-b-lg "style={{ width: '106px', height:'93px', padding:'13px, 0px, 13px, 0px', backgroundColor:'#4A4B4B' }}>

                <div className="rounded-full flex justify-center items-center" style={{backgroundColor:'#D9D9D9',boxSizing:'border-box', width:'45px', height:'45px', border:'1px solid #FFFFFF'  }}>
                    <img src={src} alt={title} className="w-45 h-45 text-xs text-gray-500" />
                </div>


                <p className="font-bold text-xs text-center  text-white">
                    {title}
                </p>
            </li>
        
    )
}
