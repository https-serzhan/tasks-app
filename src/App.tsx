import './App.css'
import {lazy, Suspense} from "react";
import AppRouter from "./app-router.tsx";

const MainHeader = lazy(() => import("./components/main-header.tsx"));

function App() {

	return (
			<div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f3f6fb_100%)]">
				<Suspense fallback={<h1>Loading...</h1>}>
					<MainHeader/>
				</Suspense>
				<main className="pb-12">
					<AppRouter/>
				</main>
			</div>
	)
}

export default App
