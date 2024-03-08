import React from 'react';
import { ConnectKitButton } from "connectkit";

export default function Header(){
    return (
        <header className="py-2 px-3 sm:py-4 sm:px-8 flex justify-between items-center bg-white border-b shadow-xs" style={{ backgroundImage: 'url(/header.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex px-8 py-4 border-b justify-between items-center bg-white">
                <img src="bm.png" alt="blockmaker-logo" className="sm:hidden" width={50}/>
                <img src="ADA_description.png" alt="blockmaker-full-logo" className="hidden sm:flex" width={200}/>
                <ConnectKitButton showBalance />
            </div>
        </header>
    )
}
