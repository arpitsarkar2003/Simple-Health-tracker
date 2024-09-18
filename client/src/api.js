const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
    };

    const response = await fetch(`${API_URL}${url}`, { ...options, headers });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

export async function register(name, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return response.json();
}

export async function getHealthRecords() {
    return fetchWithAuth('/health-records');
}

export async function addHealthRecord(record) {
    return fetchWithAuth('/health-records', {
        method: 'POST',
        body: JSON.stringify(record),
    });
}

export async function updateHealthRecord(id, record) {
    return fetchWithAuth(`/health-records/${id}`, {
        method: 'PUT',
        body: JSON.stringify(record),
    });
}

export async function deleteHealthRecord(id) {
    return fetchWithAuth(`/health-records/${id}`, {
        method: 'DELETE',
    });
}