"use client";
import { useState, useEffect } from "react";
// import axios from 'axios';
import {
  User,
  Mail,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Globe,
  Phone,
} from "lucide-react";
// import Nav from '../components/nav';
// import registrationimage from '../../../public/logo.jpg';
// import { Registration } from '../api/auth';
// import { useNavigate } from 'react-router-dom';

export default function Register() {
  // const redirect = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({
    username: false,
    email: false,
    password: false,
    confirm_password: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [country, setCountry] = useState("Pakistan");
  const [countryCode, setCountryCode] = useState("+92");

  const countries = [
    { name: "Pakistan", code: "+92" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "India", code: "+91" },
    { name: "Canada", code: "+1" },
    { name: "Australia", code: "+61" },
  ];

  const handleCountryChange = (e) => {
    const selected = countries.find((c) => c.name === e.target.value);
    setCountry(selected.name);
    setCountryCode(selected.code);
  };

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  const validateUsername = (value) => {
    if (!value.trim()) {
      return "Username is required";
    }
    if (value.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (value.length > 30) {
      return "Username must be less than 30 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return "Username can only contain letters, numbers, and underscores";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/(?=.*[@$!%*?&])/.test(value)) {
      return "Password must contain at least one special character (@$!%*?&)";
    }
    return "";
  };

  const validateConfirmPassword = (value, password) => {
    if (!value) {
      return "Please confirm your password";
    }
    if (value !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  // Handle field blur events
  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Real-time validation
  useEffect(() => {
    const usernameError = validateUsername(form.username);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(
      form.confirm_password,
      form.password
    );

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirm_password: confirmPasswordError,
    });

    const allFieldsValid =
      !usernameError && !emailError && !passwordError && !confirmPasswordError;
    const allFieldsFilled =
      form.username.trim() &&
      form.email.trim() &&
      form.password &&
      form.confirm_password;

    setIsFormValid(allFieldsValid && allFieldsFilled && termsAccepted);
  }, [form, termsAccepted]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    // Mark all fields as touched when form is submitted
    setTouchedFields({
      username: true,
      email: true,
      password: true,
      confirm_password: true,
    });

    // Final validation
    const usernameError = validateUsername(form.username);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(
      form.confirm_password,
      form.password
    );

    if (
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      !termsAccepted
    ) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirm_password: confirmPasswordError,
      });
      if (!termsAccepted) {
        alert("Please accept the Terms of Service and Privacy Policy");
      }
      return;
    }

    setIsLoading(true);
    try {
      const res = await Registration(form);
      if (res.status === 201 || res.status === 200) {
        window.location.href = "/login";
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <Nav /> */}
      <section className=" w-full flex items-center justify-center bg-gradient-to-b from-green-50 from-10% to-green-200">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-white/90 backdrop-blur-md">
          {/* Left Side - Image */}
          <div className="lg:flex w-1/2 h-[755px] relative border-r border-green-200 bg-gray-100">
            <span className="bg-[#00800042] absolute w-full h-full left-0 top-0"></span>

            <div
              className="w-full h-full  bg-cover bg-left bg-no-repeat  bg-indigo-600"
              style={{
                backgroundImage: `url(${"https://media.istockphoto.com/id/668076810/photo/man-sowing-the-land-at-a-farm.jpg?b=1&s=612x612&w=0&k=20&c=NF2isSkpoZqj7hn8YTCN_TIm0Et2uYzcDPJBVv8p_OI="})`,
                backgroundColor: "#e5f4e3",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e270e40] to-[#0e270e20]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-12 text-center">
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                  Join Our Community
                </h2>
                <p className="text-xl opacity-90 mb-6 drop-shadow-md">
                  Create your account and start your journey with us
                </p>
                <div className="w-16 h-1 bg-white rounded-full mb-6"></div>
                <p className="text-lg opacity-80 drop-shadow-sm">
                  Get access to exclusive features and connect with like-minded
                  individuals
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 lg:p-8 overflow-y-scroll scrollbar-hide">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-4xl text-[var(--color)] font-extrabold mb-2">
                  Create Account
                </h1>
                <p className="text-gray-600">
                  Join us and start your journey today
                </p>
              </div>

              <form onSubmit={registerUser} className="space-y-4">
                {/* Username Field */}
                <div>
                  <div
                    className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                      touchedFields.username && errors.username
                        ? "border-red-500 focus-within:border-red-500"
                        : form.username && !errors.username
                        ? "border-green-500 focus-within:border-green-500"
                        : "border-gray-200 focus-within:border-[var(--color)]"
                    }`}
                  >
                    <User
                      className={`text-[15px] ${
                        touchedFields.username && errors.username
                          ? "text-red-500"
                          : form.username && !errors.username
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      className="w-full p- outline-none bg-transparent text-gray-700 placeholder-gray-400 text-[15px]"
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      onBlur={() => handleFieldBlur("username")}
                    />
                    {form.username && (
                      <div className="flex-shrink-0">
                        {errors.username ? (
                          <AlertTriangle className="text-red-500 text-lg" />
                        ) : (
                          <CheckCircle2 className="text-green-500 text-lg" />
                        )}
                      </div>
                    )}
                  </div>
                  {touchedFields.username && errors.username && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <AlertTriangle className="text-xs" />
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <div
                    className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                      touchedFields.email && errors.email
                        ? "border-red-500 focus-within:border-red-500"
                        : form.email && !errors.email
                        ? "border-green-500 focus-within:border-green-500"
                        : "border-gray-200 focus-within:border-[var(--color)]"
                    }`}
                  >
                    <Mail
                      className={`text-[19px] ${
                        touchedFields.email && errors.email
                          ? "text-red-500"
                          : form.email && !errors.email
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      className="w-full p- outline-none bg-transparent text-gray-700 placeholder-gray-400 text-[15px]"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={() => handleFieldBlur("email")}
                    />
                    {form.email && (
                      <div className="flex-shrink-0">
                        {errors.email ? (
                          <AlertTriangle className="text-red-500 text-lg" />
                        ) : (
                          <CheckCircle2 className="text-green-500 text-lg" />
                        )}
                      </div>
                    )}
                  </div>
                  {touchedFields.email && errors.email && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <AlertTriangle className="text-xs" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-5">
                  {/* Country Dropdown */}
                  <div>
                    <div
                      className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                        touchedFields.country && errors.country
                          ? "border-red-500 focus-within:border-red-500"
                          : form.country && !errors.country
                          ? "border-green-500 focus-within:border-green-500"
                          : "border-gray-200 focus-within:border-[var(--color)]"
                      }`}
                    >
                      <Globe
                        className={`text-[19px] ${
                          touchedFields.country && errors.country
                            ? "text-red-500"
                            : form.country && !errors.country
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      />

                      <select
                        name="country"
                        value={form.country}
                        onChange={(e) => {
                          handleChange(e);
                          // Set country code automatically
                          const selected = countries.find(
                            (c) => c.name === e.target.value
                          );
                          setForm((prev) => ({
                            ...prev,
                            code: selected ? selected.code : "",
                          }));
                        }}
                        onBlur={() => handleFieldBlur("country")}
                        className="w-full bg-transparent outline-none text-gray-400 text-[15px]"
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>

                      {form.country && (
                        <div className="flex-shrink-0">
                          {errors.country ? (
                            <AlertTriangle className="text-red-500 text-lg" />
                          ) : (
                            <CheckCircle2 className="text-green-500 text-lg" />
                          )}
                        </div>
                      )}
                    </div>
                    {touchedFields.country && errors.country && (
                      <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                        <AlertTriangle className="text-xs" />
                        {errors.country}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <div
                      className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                        touchedFields.phone && errors.phone
                          ? "border-red-500 focus-within:border-red-500"
                          : form.phone && !errors.phone
                          ? "border-green-500 focus-within:border-green-500"
                          : "border-gray-200 focus-within:border-[var(--color)]"
                      }`}
                    >
                      <Phone
                        className={`text-[19px] ${
                          touchedFields.phone && errors.phone
                            ? "text-red-500"
                            : form.phone && !errors.phone
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-gray-600 text-[15px]">
                        {form.code}
                      </span>
                      <input
                        className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-[15px]"
                        name="phone"
                        type="tel"
                        placeholder="Enter contact number"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={() => handleFieldBlur("phone")}
                      />
                      {form.phone && (
                        <div className="flex-shrink-0">
                          {errors.phone ? (
                            <AlertTriangle className="text-red-500 text-lg" />
                          ) : (
                            <CheckCircle2 className="text-green-500 text-lg" />
                          )}
                        </div>
                      )}
                    </div>
                    {touchedFields.phone && errors.phone && (
                      <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                        <AlertTriangle className="text-xs" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div
                    className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                      touchedFields.password && errors.password
                        ? "border-red-500 focus-within:border-red-500"
                        : form.password && !errors.password
                        ? "border-green-500 focus-within:border-green-500"
                        : "border-gray-200 focus-within:border-[var(--color)]"
                    }`}
                  >
                    <Lock
                      className={`text-[19px] ${
                        touchedFields.password && errors.password
                          ? "text-red-500"
                          : form.password && !errors.password
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-[15px]"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={() => handleFieldBlur("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="text-xl" />
                      ) : (
                        <Eye className="text-xl" />
                      )}
                    </button>
                    {form.password && (
                      <div className="flex-shrink-0">
                        {errors.password ? (
                          <AlertTriangle className="text-red-500 text-lg" />
                        ) : (
                          <CheckCircle2 className="text-green-500 text-lg" />
                        )}
                      </div>
                    )}
                  </div>
                  {touchedFields.password && errors.password && (
                    <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                      <AlertTriangle className="text-xs" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <div
                    className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                      touchedFields.confirm_password && errors.confirm_password
                        ? "border-red-500 focus-within:border-red-500"
                        : form.confirm_password && !errors.confirm_password
                        ? "border-green-500 focus-within:border-green-500"
                        : "border-gray-200 focus-within:border-[var(--color)]"
                    }`}
                  >
                    <Lock
                      className={`text-[19px] ${
                        touchedFields.confirm_password &&
                        errors.confirm_password
                          ? "text-red-500"
                          : form.confirm_password && !errors.confirm_password
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-[15px]"
                      name="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={form.confirm_password}
                      onChange={handleChange}
                      onBlur={() => handleFieldBlur("confirm_password")}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="text-xl" />
                      ) : (
                        <Eye className="text-xl" />
                      )}
                    </button>
                    {form.confirm_password && (
                      <div className="flex-shrink-0">
                        {errors.confirm_password ? (
                          <AlertTriangle className="text-red-500 text-lg" />
                        ) : (
                          <CheckCircle2 className="text-green-500 text-lg" />
                        )}
                      </div>
                    )}
                  </div>
                  {touchedFields.confirm_password &&
                    errors.confirm_password && (
                      <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
                        <AlertTriangle className="text-xs" />
                        {errors.confirm_password}
                      </p>
                    )}
                </div>

                {/* Terms and Conditions */}
                <div
                  className={`flex items-start gap-3 py-2 px-4 rounded-xl transition-colors ${
                    termsAccepted
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-5 w-5 text-[var(--color)] border-gray-300 rounded focus:ring-[var(--color)] focus:ring-2"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-[var(--color)] hover:underline font-medium"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-[var(--color)] hover:underline font-medium"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className="w-full py-4 px-6 bg-[var(--color)] hover:bg-[var(--color)]/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex justify-center items-center gap-3 text-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <User className="text-xl" />
                      Create Account
                    </>
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-2">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-[var(--color)] hover:underline font-semibold transition-colors"
                    >
                      Login in here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
