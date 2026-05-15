import {useRef, useState} from "react";
import {Camera, ImagePlus, Mail, Save, Trash2, UserRound} from "lucide-react";
import {useUserStore} from "../store/user/hooks.ts";
import {API} from "../utils/api/instance.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

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
		const nextFiles: File[] = [];
		const currentFile = e.target.files?.[0];

		for (let i = 0; i < (e.target.files?.length ?? 0); i++) {
			const selected = e.target.files?.[i];
			if (selected) nextFiles.push(selected);
		}

		setFiles(prev => [...prev, ...nextFiles])
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
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
				<section className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
					<Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.55)]">
						<CardContent className="p-6">
							<div className="flex items-center gap-4">
								<Avatar className="size-18 rounded-xl border border-white/10">
									<AvatarImage src={file ? URL.createObjectURL(file) : form.avatar}/>
									<AvatarFallback>{avatarFallback}</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-xl font-semibold text-white">{form.name}</p>
									<p className="mt-1 text-sm text-slate-300">{user?.email}</p>
								</div>
							</div>
							<div className="mt-8 space-y-4">
								<div>
									<p className="text-4xl font-semibold text-white">{files.length || 1}</p>
									<p className="mt-1 text-sm text-slate-300">Загруженных изображений</p>
								</div>
								<div className="h-px bg-white/10"/>
								<div>
									<p className="text-4xl font-semibold text-white">{file ? (fileSize < 1 ? "<1" : fileSize) : 0}</p>
									<p className="mt-1 text-sm text-slate-300">Размер текущего файла, мб</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardHeader className="border-b border-slate-200 pb-5">
							<CardTitle className="text-2xl">Профиль</CardTitle>
							<CardDescription>Редактирование имени, ссылки на аватар и локальная загрузка изображения.</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6 p-6 xl:grid-cols-[minmax(0,1fr)_360px]">
							<div className="space-y-4">
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<label className="text-sm font-medium text-slate-700">Имя</label>
										<div className="relative">
											<UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"/>
											<Input
													placeholder='Имя'
													onChange={e => handleSetFormValue('name', e.target.value)}
													value={form.name}
													className="h-11 rounded-lg border-slate-200 pl-10"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-slate-700">Email</label>
										<div className="relative">
											<Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"/>
											<Input
													placeholder='Email'
													readOnly
													value={user?.email}
													className="h-11 rounded-lg border-slate-200 pl-10"
											/>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-700">Ссылка на аватар</label>
									<Input
											placeholder='Фото'
											value={form.avatar}
											onChange={e => handleSetFormValue('avatar', e.target.value)}
											className="h-11 rounded-lg border-slate-200"
									/>
								</div>

								<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div
											className={`flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition ${isDragging ? "border-slate-900 bg-white" : "border-slate-300 bg-white"}`}
											onClick={() => inputRef.current?.click()}
											onDrop={onDrop}
											onDragOver={onDragOver}
											onDragLeave={onDragLeave}
									>
										{!file && (
												<>
													<div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
														<ImagePlus className="size-5 text-slate-700"/>
													</div>
													<p className="font-medium text-slate-900">
														{isDragging ? 'Отпустите файл для загрузки' : 'Нажмите или перетащите изображение'}
													</p>
													<p className="mt-2 text-sm text-slate-500">Подходит для локального превью профиля</p>
												</>
										)}
										{file && (
												<div className="space-y-4">
													<img src={URL.createObjectURL(file)} alt="" className="max-h-48 rounded-xl object-cover shadow-sm"/>
													<div className="text-sm text-slate-600">
														<div>Название файла: {file.name}</div>
														<div>Размер файла: {fileSize < 1 ? `${fileSize.toString().replace('0.', '')} кб` : `${fileSize} мб`}</div>
													</div>
												</div>
										)}
									</div>

									<div className="mt-4 flex flex-wrap gap-3">
										<Button variant="outline" className="rounded-lg" onClick={() => inputRef.current?.click()}>
											<Camera className="mr-2 size-4"/>
											Загрузить файл
										</Button>
										{file && (
												<Button variant="outline" className="rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setFile(null)}>
													<Trash2 className="mr-2 size-4"/>
													Удалить файл
												</Button>
										)}
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<p className="text-sm font-medium text-slate-700">Галерея файлов</p>
									{files.length ? (
											<div className="mt-4 grid gap-3">
												{files.map((previewFile, index) => (
														<img
																key={index}
																src={URL.createObjectURL(previewFile)}
																alt=""
																className="w-full rounded-xl object-cover shadow-sm"
																onClick={() => setFiles(prev => prev.filter(f => f !== previewFile))}
														/>
												))}
											</div>
									) : (
											<p className="mt-3 text-sm text-slate-500">Файлы появятся здесь после загрузки.</p>
									)}
									{!!files.length && (
											<Button variant="outline" className="mt-4 rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setFiles([])}>
												Очистить список файлов
											</Button>
									)}
								</div>

								<input multiple accept='image/*' ref={inputRef} type='file' onChange={handleChangeFile} hidden/>
								<Button
										disabled={!isModified || isEmpty}
										className="h-11 w-full rounded-lg bg-slate-900 text-white hover:bg-slate-800"
										onClick={handleSubmit}
								>
									<Save className="mr-2 size-4"/>
									Сохранить изменения
								</Button>
							</div>
						</CardContent>
					</Card>
				</section>
			</div>
	);
};

export default ProfilePage;
