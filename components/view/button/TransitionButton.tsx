type Props = {
    duration: number,
    src: string,
    target_url: string
}

export default function TransitionButton({ duration, src, target_url }: Props) {

    return (
        <div onClick={() => window.location.href = `${target_url}`}>
            <li id="cartButton" className={`ml-3 mt-2 md:pr-10 transition duration-${duration} ease-in-out transform hover:-translate-y-1 hover:scale-110`}>
                <img src={src} className="w-6 h-6 md:w-10 md:h-10 cursor-pointer" alt="" />
            </li>
        </div>
    );
}