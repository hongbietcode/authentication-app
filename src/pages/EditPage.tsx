import {Puff, useLoading} from "@agney/react-loading";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {useAuth} from "../contexts/AuthContext";
import {ProfileType} from "../types/ObjectType";

const defaultPhotoUrl = "https://i.pinimg.com/564x/98/7f/d7/987fd7fd0462bab17aa86d411611daf1.jpg";
export default function EditPage() {
	const history = useHistory();
	const {register, errors, handleSubmit} = useForm<ProfileType>();
	const {currentUser, updateProfile} = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {containerProps, indicatorEl} = useLoading({
		loading: isLoading,
		indicator: <Puff />,
	});

	const onSubmit = (data: ProfileType) => {
		setIsLoading(true);
		updateProfile &&
			updateProfile(data)
				.then(() => {
					window.location.reload();
				})
				.catch((err) => {
					toast(err.message, {
						hideProgressBar: true,
						className: "bg-red-100 text-red-500 border border-red-500",
						position: "bottom-right",
					});
					setIsLoading(false);
				});
	};

	return (
		<div {...containerProps} className="flex items-center flex-col space-y-2">
			{isLoading && (
				<div className="flex justify-center items-center fixed w-screen h-screen top-0 left-0	bg-white bg-opacity-40">
					<div className="w-20 text-red-500">{indicatorEl}</div>
				</div>
			)}

			<div className="profile-form__header">
				<button onClick={() => history.goBack()} className="text-blue-400">
					<i className="far fa-chevron-left"></i> Back
				</button>
			</div>

			<div className="profile-form__body">
				<div className="profile-form__control ">
					<div>
						<h2 className="font-medium">Change Info</h2>
						<p className="text-sm">Changes will be reflected to every services</p>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="px-10 py-5" autoComplete="off">
					<div className="form-control">
						<input type="file" name="avatar" accept="image/*" ref={register} />
					</div>

					<div className="form-control block">
						<label className="font-medium" htmlFor="name">
							Name
						</label>
						<input
							className="input block"
							type="text"
							id="name"
							name="name"
							placeholder="Enter your name..."
							defaultValue={currentUser?.displayName || "Kangkuru"}
							ref={register({
								required: {
									value: true,
									message: "Please enter a valid name",
								},
							})}
						/>
					</div>

					<div className="form-control block">
						<label className="font-medium" htmlFor="bio">
							Bio
						</label>
						<textarea className="input block" id="bio" name="bio" placeholder="Enter your bio..." ref={register}></textarea>
					</div>

					<div className="form-control block">
						<label className="font-medium" htmlFor="phone">
							Phone
						</label>
						<input className="input block" type="number" id="phone" name="phone" ref={register} />
					</div>

					<div className="form-control block">
						<label className="font-medium" htmlFor="name">
							Email
						</label>
						<input
							className="input block"
							type="email"
							id="email"
							name="email"
							placeholder="Enter your email address..."
							defaultValue={currentUser?.email || ""}
							readOnly
						/>
					</div>

					<div className="form-control block">
						<label className="font-medium" htmlFor="password">
							Password
						</label>
						<input
							className="input block"
							type="password"
							id="password"
							name="password"
							placeholder="Enter new password..."
							ref={register({
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
							})}
						/>
						{errors.password && <span className="text-sm text-rose-500">{errors.password.message}</span>}
					</div>

					<button className="form-control btn border border-blue-400 text-blue-400 hover:bg-blue-100">Save</button>
				</form>
			</div>
		</div>
	);
}
