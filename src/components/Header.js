
import { MapPin, CircleCheck} from "lucide-react";

function Header() {
    return(
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex h-16 max-w-[1600px] items-centre justify-between px-5 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                        <MapPin size={21} strokeWidth={2.3}/>
                    </div>

                    <div>
                        <h1 className="text-base font-bold text-slate-950">
                            MetroRoute
                        </h1>
                        <p className="text-xs text-slate-500">
                            Journer planner
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <CircleCheck size={17}/>
                    <span className="hidden sm:inline">Network operational</span>
                </div>
            </div>
        </header>
    )
}

export default Header;