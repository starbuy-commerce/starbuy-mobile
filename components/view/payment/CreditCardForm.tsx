import Input from "../Input"

export default function CreditCardForm() {
    return (
        <div className="w-2/5">
            <div className="flex mb-2">
                <svg className="fill-gray-700" width="32" height="32" viewBox="0 0 24 24"><path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z"/></svg>
                <p className="font-inter my-auto font-semibold text-sm ml-4">INFORMAÇÕES DO CARTÃO</p>
            </div>
            <input placeholder="Número do cartão" className={`w-full border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`} type="number"/>
            <div className="flex gap-2 mt-4">
                <input placeholder="CVV" className={`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
                <input placeholder="Validade" className={`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
            </div>
            <div className="flex gap-2 mt-4">
                <input placeholder="Agência" className={`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
                <input placeholder="Conta" className={`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
            </div>
        </div>
    );
}