import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: 'example@mail.com',
    password: '123456',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(form);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate('/clientes');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="p-6 text-center border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Paris SaaS
          </h1>
          <p className="text-sm text-blue-500 dark:text-gray-400">
            Gestión de perfumería
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-100 p-2 rounded-lg dark:bg-red-200">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
