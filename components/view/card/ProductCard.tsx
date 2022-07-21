type Props = {
    img: string,
    name: string,
    price: number,
    id: string
}

export default function ProductCard({ img, name, price, id }: Props) {
    var formated: string = name;
    if(formated.length > 40) formated = name.substring(0, 40) + "..."

    return (
        <>
            <div className="z-0 flex-grow cursor-pointer justify-center box-border flex-row w-40 max-w-[10rem] md:max-w-[13rem] md:w-52 md:shadow-md border-yellow-400 rounded-lg border shadow-gray-300 transition ease-in-out hover:border-violet-700 delay-100 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => window.location.href="/item/" + id}>
                <img src={img} className="p-4 w-40 h-40 md:h-52 md:w-52 rounded-t-md" />
                <div className="w-40 h-28 md:w-52 md:h-24">
                    <p className="text-sm break-words font-inter font-light mt-2 ml-2 mr-2 text-gray-800">{formated}</p>
                    <p className="font-inter font-bold text-violet-900 static mt-4 ml-2">R$ {price.toFixed(2)}</p>
                </div>
            </div>
        </>
    );
}