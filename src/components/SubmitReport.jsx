import React, { useState, useEffect } from 'react';
import * as exifr from 'exifr';
import { Upload, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

const SubmitReport = () => {
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [uLocation, setULocation] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        citizenName: '',
        email: '',
        phone: '',
        category: 'Roads',
        location: '',
        description: ''
    });

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setFormData(prev => ({
                ...prev,
                citizenName: userInfo.name || '',
                email: userInfo.email || '',
                phone: userInfo.phoneNumber || ''
            }));
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setULocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    time: new Date()
                });
            });
        }
    }, []);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setError('');
        setIsValid(false);

        try {
            // Use exifr for modern, promise-based extraction
            const gps = await exifr.gps(selectedFile);
            const data = await exifr.parse(selectedFile);

            if (!gps || !data || !data.DateTimeOriginal) {
                setError("No EXIF metadata found. Please upload an original photo with GPS data. If you are testing, use an image taken by your phone with GPS enabled.");
                return;
            }

            const imgLat = gps.latitude;
            const imgLon = gps.longitude;
            const imgDate = new Date(data.DateTimeOriginal);

            setMetadata({ lat: imgLat, lng: imgLon, date: imgDate });
            validateTruth(imgLat, imgLon, imgDate);
        } catch (err) {
            console.error("EXIF Error:", err);
            setError("Failed to extract metadata. Please ensure the file is a valid image with GPS data.");
        }
    };



    const validateTruth = (imgLat, imgLon, imgDate) => {
        if (!uLocation) {
            setError("Unable to get current location for verification.");
            return;
        }

        // Distance check (Haversine formula simplified for small distance)
        const getDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371e3; // meters
            const φ1 = lat1 * Math.PI / 180;
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        const distance = getDistance(imgLat, imgLon, uLocation.lat, uLocation.lng);
        const timeDiff = Math.abs(uLocation.time - imgDate) / 1000 / 60; // minutes

        if (distance > 100) {
            setError(`Location mismatch: Image taken ${Math.round(distance)}m away (Max 100m).`);
        } else if (timeDiff > 5) {
            setError(`Time mismatch: Image taken ${Math.round(timeDiff)} mins ago (Max 5 mins).`);
        } else {
            setIsValid(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const payload = {
                ...formData,
                latitude: metadata.lat,
                longitude: metadata.lng,
                exifTimestamp: metadata.date,
                proofUrl: "https://via.placeholder.com/150", // Mock URL
                userId: userInfo?._id || "67bc5828de3e498967923761"
            };

            await axios.post('/api/grievances', payload);
            alert("Grievance submitted successfully with Truth-Meter verification!");
            setFile(null);
            setIsValid(false);
        } catch (err) {
            setError("Failed to submit grievance.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-pmc-blue mb-6 flex items-center gap-2">
                <CheckCircle className="text-pmc-orange" />
                Submit Verified Grievance
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text" placeholder="Your Name" required
                        className="p-3 border rounded-lg focus:ring-2 ring-pmc-blue/20 outline-none"
                        value={formData.citizenName} onChange={(e) => setFormData({ ...formData, citizenName: e.target.value })}
                    />
                    <input
                        type="email" placeholder="Email Address" required
                        className="p-3 border rounded-lg focus:ring-2 ring-pmc-blue/20 outline-none"
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <input
                    type="tel" placeholder="Phone Number" required
                    className="w-full p-3 border rounded-lg focus:ring-2 ring-pmc-blue/20 outline-none"
                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

                <select
                    className="w-full p-3 border rounded-lg focus:ring-2 ring-pmc-blue/20 outline-none"
                    value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option>Roads</option>
                    <option>Water</option>
                    <option>Sanitation</option>
                    <option>Electricity</option>
                </select>

                <input
                    type="text" placeholder="Location Name / Landmark" required
                    className="w-full p-3 border rounded-lg focus:ring-2 ring-pmc-blue/20 outline-none"
                    value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />

                <textarea
                    placeholder="Describe the issue..." required
                    className="w-full p-3 border rounded-lg h-32 focus:ring-2 ring-pmc-blue/20 outline-none"
                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>

                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isValid ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-pmc-blue'}`}>
                    <input
                        type="file" accept="image/*" id="fileInput" className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                        <Upload className={`w-12 h-12 mb-2 ${isValid ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="font-semibold text-gray-600">
                            {file ? file.name : 'Upload Photo (with GPS)'}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">Only original, recently taken photos allowed</p>
                    </label>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {isValid && (
                    <div className="bg-green-50 p-4 rounded-lg space-y-2 border border-green-200">
                        <div className="flex items-center gap-2 text-green-700 text-sm font-bold">
                            <CheckCircle size={18} /> Truth-Meter Verified!
                        </div>
                        <div className="grid grid-cols-2 text-xs text-green-600">
                            <span className="flex items-center gap-1"><MapPin size={12} /> {metadata.lat.toFixed(4)}, {metadata.lng.toFixed(4)}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {metadata.date.toLocaleTimeString()}</span>
                        </div>
                    </div>
                )}

                <button
                    type="submit" disabled={!isValid || isSubmitting}
                    className="w-full py-4 bg-pmc-blue text-white font-bold rounded-lg shadow-lg hover:bg-opacity-90 disabled:bg-gray-400 transition-all uppercase tracking-widest"
                >
                    {isSubmitting ? 'Processing...' : 'Submit Verified Report'}
                </button>
            </form>
        </div>
    );
};

export default SubmitReport;
