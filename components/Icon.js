import Image from "next/image"


const Icon = ({ type }) => {
    return (
        <Image 
            src={`/icons/${type}.svg`}
            alt={`${type} icon`} 
            width={50} 
            height={50} 
         />
    )

}

export default Icon;