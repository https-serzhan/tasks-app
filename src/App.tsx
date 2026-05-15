import './App.css'
import {lazy, Suspense} from "react";
import AppRouter from "./app-router.tsx";

const MainHeader = lazy(() => import("./components/main-header.tsx"));

function App() {

	return (
			<div className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f7ff_0%,#f3f4f6_45%,#eef2ff_100%)]">
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
