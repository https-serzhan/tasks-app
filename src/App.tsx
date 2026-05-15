import './App.css'
import {lazy, Suspense} from "react";
import AppRouter from "./app-router.tsx";

const MainHeader = lazy(() => import("./components/main-header.tsx"));

function App() {

	return (
			<div className="app-shell">
				<Suspense fallback={<h1>Loading...</h1>}>
					<MainHeader/>
				</Suspense>
				<main className="app-main">
					<AppRouter/>
				</main>
			</div>
	)
}

export default App
