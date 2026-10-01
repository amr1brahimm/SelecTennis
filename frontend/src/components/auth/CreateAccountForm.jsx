import { useState } from "react";
import { apiUrl } from "../../config/api.js";

function CreateAccountForm({ onSignIn, onSuccess }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    height_cm: "",
    weight_kg: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirm_password) {
  alert("Passwords do not match.");
  return;
}

    try {
      // Convert DD / MM / YYYY to YYYY-MM-DD
      const dateParts = formData.date_of_birth
        .replace(/\s/g, "")
        .split("/");

      if (dateParts.length !== 3) {
        alert("Please enter your date of birth as DD / MM / YYYY");
        return;
      }

      const [day, month, year] = dateParts;
      const formattedDate = `${year}-${month}-${day}`;

      const response = await fetch(apiUrl("/auth/register"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            date_of_birth: formattedDate,
            height_cm: Number(formData.height_cm),
            weight_kg: Number(formData.weight_kg),
          }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Account creation failed");
        return;
      }

      localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

onSuccess?.(data.user, "registered");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to connect to the server");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/10";

  const labelClass =
    "mb-2 block font-label-md text-xs font-bold uppercase tracking-[0.03em] text-on-surface";

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-headline-md text-[30px] font-bold tracking-[-0.025em] text-on-surface">
          Create your account
        </h1>

        <p className="mt-2 max-w-[360px] font-body-md text-sm leading-6 text-on-surface-variant">
          Join SelecTennis and find the right racket for your game.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First + Last name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First Name
            </label>

            <input
              id="firstName"
              name="first_name"
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last Name
            </label>

            <input
              id="lastName"
              name="last_name"
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="registerEmail" className={labelClass}>
            Email Address
          </label>

          <input
            id="registerEmail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phoneNumber" className={labelClass}>
            Phone Number
          </label>

          <input
            id="phoneNumber"
            name="phone_number"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* DOB + Gender */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dateOfBirth" className={labelClass}>
              Date of Birth
            </label>

            <input
              id="dateOfBirth"
              name="date_of_birth"
              type="text"
              inputMode="numeric"
              placeholder="DD / MM / YYYY"
              maxLength="10"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="gender" className={labelClass}>
              Gender
            </label>

            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="" disabled>
                Select gender
              </option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Height + Weight */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="height" className={labelClass}>
              Height (cm)
            </label>

           <input
            id="height"
            name="height_cm"
            type="number"
            min="100"
            max="250"
            step="1"
            placeholder="180"
            value={formData.height_cm}
            onChange={handleChange}
            required
            className={inputClass}
          />
          </div>

          <div>
            <label htmlFor="weight" className={labelClass}>
              Weight (kg)
            </label>

            <input
            id="weight"
            name="weight_kg"
            type="number"
            min="30"
            max="300"
            step="1"
            placeholder="75"
            value={formData.weight_kg}
            onChange={handleChange}
            required
            className={inputClass}
          />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="registerPassword" className={labelClass}>
            Password
          </label>

          <input
            id="registerPassword"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm your password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-secondary-container px-5 py-3.5 font-label-lg text-sm font-bold text-on-surface transition hover:brightness-95"
        >
          Create Account
        </button>
      </form>

      {/* Sign In */}
      <div className="mt-8 border-t border-outline-variant/40 pt-7">
        <div className="flex items-center justify-center gap-2 font-body-md text-sm text-on-surface-variant">
          <span>Already have an account?</span>

          <button
            type="button"
            onClick={onSignIn}
            className="font-label-md font-bold text-primary underline-offset-4 hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountForm;