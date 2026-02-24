import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Award, Edit2, Save, X, LogOut } from 'lucide-react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            navigate('/login');
        } else {
            fetchProfile(userInfo.token);
        }
    }, [navigate]);

    const fetchProfile = async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
            setUser(data);
            setFormData({
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber || '',
                address: data.address || '',
                password: '',
            });
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch profile');
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.put('http://localhost:5000/api/users/profile', formData, config);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-pmc-blue px-8 py-12 text-white relative">
                    <button
                        onClick={logoutHandler}
                        className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors text-sm font-bold"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-pmc-blue">
                            <User size={48} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black">{user?.name}</h1>
                            <p className="inline-block mt-2 px-3 py-1 bg-pmc-orange rounded-full text-xs font-bold uppercase tracking-wider">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
                    {success && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg text-sm">{success}</div>}

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">User Information</h2>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 text-pmc-blue hover:bg-pmc-blue/5 px-4 py-2 rounded-lg transition-colors font-bold"
                            >
                                <Edit2 size={18} /> Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors font-bold"
                            >
                                <X size={18} /> Cancel
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Credit Score Pillar */}
                        <div className="bg-pmc-blue/5 p-6 rounded-2xl border border-pmc-blue/10 flex flex-col items-center justify-center text-center">
                            <Award className="text-pmc-orange mb-4" size={48} />
                            <h3 className="text-gray-600 font-bold uppercase tracking-widest text-xs mb-1">Score Credit</h3>
                            <p className="text-5xl font-black text-pmc-blue">{user?.scoreCredit}</p>
                            <p className="mt-2 text-xs text-pmc-blue/60 font-medium italic">Active contributor status</p>
                        </div>

                        {/* Profile Data */}
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <Mail className="text-pmc-blue" size={20} />
                                    <div className="flex-1">
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Email Address</p>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                className="w-full bg-transparent border-b border-pmc-blue focus:outline-none text-sm py-1"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        ) : (
                                            <p className="text-gray-700 font-bold">{user?.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <Phone className="text-pmc-blue" size={20} />
                                    <div className="flex-1">
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Phone Number</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-pmc-blue focus:outline-none text-sm py-1"
                                                value={formData.phoneNumber}
                                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                placeholder="Add phone number"
                                            />
                                        ) : (
                                            <p className="text-gray-700 font-bold">{user?.phoneNumber || 'N/A'}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <MapPin className="text-pmc-blue" size={20} />
                                    <div className="flex-1">
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Local Address</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-pmc-blue focus:outline-none text-sm py-1"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="Add address"
                                            />
                                        ) : (
                                            <p className="text-gray-700 font-bold">{user?.address || 'N/A'}</p>
                                        )}
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex-1">
                                            <p className="text-[10px] uppercase font-bold text-gray-400">Change Password (optional)</p>
                                            <input
                                                type="password"
                                                className="w-full bg-transparent border-b border-pmc-blue focus:outline-none text-sm py-1"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-pmc-blue text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pmc-blue/90 transition-all shadow-lg"
                                >
                                    <Save size={20} /> Save Changes
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
