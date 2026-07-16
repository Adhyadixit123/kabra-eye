import { NextResponse, type NextRequest } from "next/server";

const redirects: Record<string, string> = {
  "/instagram": "https://www.instagram.com/kabraeyehospital_sodala/",
  "/instagram/": "https://www.instagram.com/kabraeyehospital_sodala/",
  "/free-eye-camp-jaipur": "/authority/#camps",
  "/free-eye-camp-jaipur/": "/authority/#camps",
  "/au-finance-bank-eye-camp": "/authority/#camps",
  "/au-finance-bank-eye-camp/": "/authority/#camps",
  "/research": "/authority/#research",
  "/research/": "/authority/#research",
  "/news": "/authority/#media",
  "/news/": "/authority/#media",
  "/media": "/authority/#media",
  "/media/": "/authority/#media",
  "/trans-prk": "/lasik-trans-prk/",
  "/trans-prk/": "/lasik-trans-prk/",
  "/lasik": "/lasik-trans-prk/",
  "/lasik/": "/lasik-trans-prk/",
  "/cataract": "/service/cataract-surgery/",
  "/cataract/": "/service/cataract-surgery/",
  "/retina": "/service/retina-diabetic-eye-care/",
  "/retina/": "/service/retina-diabetic-eye-care/",
  "/glaucoma": "/service/glaucoma-clinic/",
  "/glaucoma/": "/service/glaucoma-clinic/",
  "/cornea": "/service/cornea-clinic/",
  "/cornea/": "/service/cornea-clinic/",
};

export function proxy(request: NextRequest) {
  const destination = redirects[request.nextUrl.pathname];

  if (!destination) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(destination, request.url), 308);
}

export const config = {
  matcher: [
    "/instagram/:path*",
    "/free-eye-camp-jaipur/:path*",
    "/au-finance-bank-eye-camp/:path*",
    "/research/:path*",
    "/news/:path*",
    "/media/:path*",
    "/trans-prk/:path*",
    "/lasik/:path*",
    "/cataract/:path*",
    "/retina/:path*",
    "/glaucoma/:path*",
    "/cornea/:path*",
  ],
};
