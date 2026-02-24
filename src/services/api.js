


const BASE_URL = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com'

export async function getApiKey() {
    const response = await fetch(`${BASE_URL}/key`);
    const data = await response.json();
    return data.key;
}

export async function createBooking(bookingData) {
    const apiKey = await getApiKey();
    
    const response = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        throw new Error('Booking failed');
    }

    return await response.json();
}