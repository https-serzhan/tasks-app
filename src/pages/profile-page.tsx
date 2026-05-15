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
			<div className="page-shell">
				<section className="profile-layout">
					<Card className="panel panel--dark">
						<CardContent className="sidebar-panel__content">
							<div className="profile-hero">
								<Avatar className="profile-hero__avatar">
									<AvatarImage src={file ? URL.createObjectURL(file) : form.avatar}/>
									<AvatarFallback>{avatarFallback}</AvatarFallback>
								</Avatar>
								<div>
									<p className="profile-hero__name">{form.name}</p>
									<p className="profile-hero__email">{user?.email}</p>
								</div>
							</div>
							<div className="profile-metrics">
								<div>
									<p className="profile-metric__value">{files.length || 1}</p>
									<p className="profile-metric__text">Загруженных изображений</p>
								</div>
								<div className="sidebar-divider"/>
								<div>
									<p className="profile-metric__value">{file ? (fileSize < 1 ? "<1" : fileSize) : 0}</p>
									<p className="profile-metric__text">Размер текущего файла, мб</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="panel">
						<CardHeader className="panel__header">
							<CardTitle className="panel__title panel__title--sm">Профиль</CardTitle>
							<CardDescription>Редактирование имени, ссылки на аватар и локальная загрузка изображения.</CardDescription>
						</CardHeader>
						<CardContent className="panel__content">
							<div className="editor-grid">
								<div className="form-stack">
									<div className="two-fields">
										<div className="form-group">
											<label className="form-label">Имя</label>
											<div className="field-with-icon">
												<UserRound className="field-with-icon__icon"/>
											<Input
													placeholder='Имя'
													onChange={e => handleSetFormValue('name', e.target.value)}
													value={form.name}
													className="form-input form-input--with-icon"
											/>
										</div>
									</div>
									<div className="form-group">
										<label className="form-label">Email</label>
										<div className="field-with-icon">
											<Mail className="field-with-icon__icon"/>
											<Input
													placeholder='Email'
													readOnly
													value={user?.email}
													className="form-input form-input--with-icon"
											/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label className="form-label">Ссылка на аватар</label>
									<Input
											placeholder='Фото'
											value={form.avatar}
											onChange={e => handleSetFormValue('avatar', e.target.value)}
											className="form-input"
									/>
								</div>

								<div className="upload-panel">
									<div
											className={isDragging ? "dropzone dropzone--dragging" : "dropzone"}
											onClick={() => inputRef.current?.click()}
											onDrop={onDrop}
											onDragOver={onDragOver}
											onDragLeave={onDragLeave}
									>
										{!file && (
												<>
													<div className="icon-box">
														<ImagePlus className="app-brand__icon"/>
													</div>
													<p className="dropzone__title">
														{isDragging ? 'Отпустите файл для загрузки' : 'Нажмите или перетащите изображение'}
													</p>
													<p className="dropzone__text">Подходит для локального превью профиля</p>
												</>
										)}
										{file && (
												<div>
													<img src={URL.createObjectURL(file)} alt="" className="dropzone__preview"/>
													<div className="dropzone__filemeta">
														<div>Название файла: {file.name}</div>
														<div>Размер файла: {fileSize < 1 ? `${fileSize.toString().replace('0.', '')} кб` : `${fileSize} мб`}</div>
													</div>
												</div>
										)}
									</div>

									<div className="upload-actions">
										<Button variant="outline" className="app-button-secondary" onClick={() => inputRef.current?.click()}>
											<Camera className="inline-icon-left"/>
											Загрузить файл
										</Button>
										{file && (
												<Button variant="outline" className="app-button-secondary app-button-icon-danger" onClick={() => setFile(null)}>
													<Trash2 className="inline-icon-left"/>
													Удалить файл
												</Button>
										)}
									</div>
								</div>
							</div>

							<div className="form-stack">
								<div className="gallery-panel">
									<p className="gallery-panel__title">Галерея файлов</p>
									{files.length ? (
											<div className="gallery-grid">
												{files.map((previewFile, index) => (
														<img
																key={index}
																src={URL.createObjectURL(previewFile)}
																alt=""
																onClick={() => setFiles(prev => prev.filter(f => f !== previewFile))}
														/>
												))}
											</div>
									) : (
											<p className="gallery-empty">Файлы появятся здесь после загрузки.</p>
									)}
									{!!files.length && (
											<Button variant="outline" className="app-button-secondary app-button-icon-danger" onClick={() => setFiles([])}>
												Очистить список файлов
											</Button>
									)}
								</div>

								<input multiple accept='image/*' ref={inputRef} type='file' onChange={handleChangeFile} hidden/>
								<Button
										disabled={!isModified || isEmpty}
										className="app-button-primary app-button-block"
										onClick={handleSubmit}
								>
									<Save className="inline-icon-left"/>
									Сохранить изменения
								</Button>
							</div>
						</div>
						</CardContent>
					</Card>
				</section>
			</div>
	);
};

export default ProfilePage;
