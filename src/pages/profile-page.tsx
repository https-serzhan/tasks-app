import {useUserStore} from "../store/user/hooks.ts";
import {useRef, useState} from "react";
import {API} from "../utils/api/instance.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ImagePlus, Trash2} from "lucide-react";

const ProfilePage = () => {
	const {user, update_user} = useUserStore();
	const inputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const [form, setForm] = useState({
		name: user?.name ?? "",
		avatar: user?.avatar ?? "",
	});
	const isModified = form.name !== user?.name || form.avatar !== user?.avatar;
	const isEmpty = !form.name || !form.avatar;

	const fileSize = Number((file?.size ? file.size / 1024 / 1024 : 0).toFixed(3));
	const handleSetFormValue = (key: 'name' | 'avatar', value: string) => {
		setForm(prev => ({
			...prev,
			[key]: value
		}))
	}

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const myFiles: File[] = [];

		const currentFile = e.target.files?.[0];
		for (let i = 0; i < (e?.target?.files?.length ?? 0); i++) {
			if (e.target.files?.[i]) {
				myFiles.push(e.target.files[i] as File);
			}
		}
		setFiles(prev => [...prev, ...myFiles])
		setFile(currentFile ?? null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const handleSubmit = async () => {
		update_user(form)
		const formData = new FormData();
		formData.append('name', form.name);
		files.forEach(f => formData.append('avatar', f));
		void API.patch('/users/1', formData)
	}

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		setFile(droppedFile ?? null);
		setIsDragging(false);
	};

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const avatarFallback = user?.name ? user.name.split(' ').slice(0, 2).map((name) => name[0]).join('') : "U";

	return (
			<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
				<Card className="border-white/70 bg-white/85 shadow-[0_24px_60px_-30px_rgba(30,41,59,0.35)]">
					<CardHeader>
						<CardTitle className="text-3xl">Профиль</CardTitle>
						<CardDescription>Редактирование локального демо-профиля и загрузка аватара.</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
						<div className="space-y-4">
							<div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
								<Avatar className="size-20">
									<AvatarImage src={file ? URL.createObjectURL(file) : form.avatar}/>
									<AvatarFallback>{avatarFallback}</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-lg font-semibold text-slate-950">{form.name}</p>
									<p className="text-sm text-slate-500">{user?.email}</p>
								</div>
							</div>
							<div
									className={`flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-6 text-center transition ${isDragging ? "border-indigo-400 bg-indigo-50" : "border-slate-300 bg-slate-50"}`}
									onClick={() => inputRef.current?.click()}
									onDrop={onDrop}
									onDragOver={onDragOver}
									onDragLeave={onDragLeave}
							>
								{!file && (
										<>
											<div className="mb-4 rounded-2xl bg-white p-3 shadow-sm">
												<ImagePlus className="size-5 text-slate-900"/>
											</div>
											<p className="font-medium text-slate-900">
												{isDragging ? 'Отпустите файл для загрузки' : 'Нажмите или перетащите изображение'}
											</p>
											<p className="mt-2 text-sm text-slate-500">PNG, JPG и другие изображения</p>
										</>
								)}
								{file && (
										<div className="space-y-4">
											<img src={URL.createObjectURL(file)} alt="" className="max-h-52 rounded-2xl object-cover shadow-sm"/>
											<div className="text-sm text-slate-600">
												<div>Название файла: {file.name}</div>
												<div>
													Размер файла: {fileSize < 1 ? `${fileSize.toString().replace('0.', '')} кб` : `${fileSize} мб`}
												</div>
											</div>
										</div>
								)}
							</div>
							<div className="flex flex-wrap gap-3">
								<Button variant="outline" onClick={() => inputRef.current?.click()}>
									Загрузить файл
								</Button>
								{file && (
										<Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setFile(null)}>
											<Trash2 className="mr-2 size-4"/>
											Удалить файл
										</Button>
								)}
							</div>
						</div>

						<div className="space-y-4">
							<Input
									placeholder='Имя'
									onChange={e => handleSetFormValue('name', e.target.value)}
									value={form.name}
									className="h-11"
							/>
							<Input
									placeholder='Фото'
									value={form.avatar}
									onChange={e => handleSetFormValue('avatar', e.target.value)}
									className="h-11"
							/>
							<Input
									placeholder='Email'
									readOnly
									value={user?.email}
									className="h-11 select-all"
							/>
							{!!files.length && (
									<div className="grid gap-3 sm:grid-cols-2">
										{files.map((previewFile, index) => (
												<img
														key={index}
														src={URL.createObjectURL(previewFile)}
														alt=""
														className="w-full rounded-2xl object-cover shadow-sm"
														onClick={() => setFiles(prev => prev.filter(f => f !== previewFile))}
												/>
										))}
									</div>
							)}
							{!!files.length && (
									<Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setFiles([])}>
										Очистить список файлов
									</Button>
							)}
							<input multiple accept='image/*' ref={inputRef} type='file' onChange={handleChangeFile} hidden/>
							<Button
									disabled={!isModified || isEmpty}
									className="h-11 bg-slate-950 text-white hover:bg-slate-800"
									onClick={handleSubmit}
							>
								Сохранить
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
	);
};

export default ProfilePage;
