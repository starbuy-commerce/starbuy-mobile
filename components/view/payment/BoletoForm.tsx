import Input from "../Input"
import pix from "../../images/pix.svg"

export default function BoletoForm() {
    return (
        <div className="w-2/5">
            <div className="flex mb-2">
            <svg className="fill-gray-700" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 14.083c0-2.145-2.232-2.742-3.943-3.546-1.039-.54-.908-1.829.581-1.916.826-.05 1.675.195 2.443.465l.362-1.647c-.907-.276-1.719-.402-2.443-.421v-1.018h-1v1.067c-1.945.267-2.984 1.487-2.984 2.85 0 2.438 2.847 2.81 3.778 3.243 1.27.568 1.035 1.75-.114 2.011-.997.226-2.269-.168-3.225-.54l-.455 1.644c.894.462 1.965.708 3 .727v.998h1v-1.053c1.657-.232 3.002-1.146 3-2.864z"/></svg>
                <p className="font-inter my-auto font-semibold text-sm ml-4">INFORMAÇÕES DO BOLETO</p>
            </div>
            <div className="flex gap-2 mt-4">
                <input placeholder="Nome" className={`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
                <input placeholder="Sobrenome" className={`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
            </div>
            <input placeholder="CPF" className={`w-full border-[1px] mt-4 rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
        </div>
    );
}