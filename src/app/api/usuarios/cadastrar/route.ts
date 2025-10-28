import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Request body received in backend:', body);

    const response = await fetch('https://challenge-java-fgyb.onrender.com/api/usuarios/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log('Response from external API:', data);

    if (!response.ok) {
      console.error('Error response from external API:', data);
      const errorRes = NextResponse.json({ message: data.message || 'Erro desconhecido ao cadastrar' }, { status: response.status });
      errorRes.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      errorRes.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      errorRes.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      errorRes.headers.set('Access-Control-Allow-Credentials', 'true');
      return errorRes;
    }

    const res = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie header from backend response to client
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      res.headers.set('set-cookie', setCookie);
    }

    res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    res.headers.set('Access-Control-Allow-Credentials', 'true');

    return res;
  } catch (error) {
    console.error('Exception caught in backend API:', error);
    const errorRes = NextResponse.json({ message: 'Erro ao conectar com o servidor: ' + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
    errorRes.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    errorRes.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    errorRes.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    errorRes.headers.set('Access-Control-Allow-Credentials', 'true');
    return errorRes;
  }
}
