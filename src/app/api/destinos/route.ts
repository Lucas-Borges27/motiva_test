import { NextRequest, NextResponse } from 'next/server';

export async function OPTIONS(request: NextRequest) {
  const res = new NextResponse(null, { status: 200 });
  res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  res.headers.set('Access-Control-Allow-Credentials', 'true');
  return res;
}

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get('cookie') || '';
    const response = await fetch('https://challenge-java-fgyb.onrender.com/api/destinos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cookie': cookie
      }
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (!response.ok || data === null) {
      const errorMessage = data && data.message ? data.message : 'Erro desconhecido ao buscar destinos ou resposta inválida do servidor';
      const errorRes = NextResponse.json({ message: errorMessage }, { status: response.status });
      errorRes.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      errorRes.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      errorRes.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      errorRes.headers.set('Access-Control-Allow-Credentials', 'true');
      return errorRes;
    }

    const res = NextResponse.json(data, { status: response.status });

    res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    res.headers.set('Access-Control-Allow-Credentials', 'true');

    return res;
  } catch (error) {
    const errorRes = NextResponse.json({ message: 'Erro ao conectar com o servidor: ' + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
    errorRes.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    errorRes.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    errorRes.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    errorRes.headers.set('Access-Control-Allow-Credentials', 'true');
    return errorRes;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Clone the request to be able to read the body multiple times
    const clonedRequest = request.clone();
    const body = await clonedRequest.json();

    const cookie = request.headers.get('cookie') || '';
    const response = await fetch('https://challenge-java-fgyb.onrender.com/api/destinos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cookie': cookie
      },
      body: JSON.stringify(body)
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      const text = await response.text();
      data = { message: `Resposta inválida do servidor: ${text}` };
    }

    if (!response.ok) {
      const errorMessage = data && data.message ? data.message : 'Erro desconhecido ao salvar destino ou resposta inválida do servidor';
      const errorRes = NextResponse.json({ message: errorMessage }, { status: response.status });
      errorRes.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      errorRes.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      errorRes.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      errorRes.headers.set('Access-Control-Allow-Credentials', 'true');
      return errorRes;
    }

    const res = NextResponse.json(data, { status: response.status });

    res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    res.headers.set('Access-Control-Allow-Credentials', 'true');

    return res;
  } catch (error) {
    const errorRes = NextResponse.json({ message: 'Erro ao conectar com o servidor: ' + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
    errorRes.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    errorRes.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    errorRes.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    errorRes.headers.set('Access-Control-Allow-Credentials', 'true');
    return errorRes;
  }
}


