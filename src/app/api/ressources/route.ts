import { PrismaClient, Ressource } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";
const LIMIT_MAX = 10;

// the api can be used with the following http methods
// - GET : get ressources from the database
// - POST : add a new ressource to the database
// - PUT : update an existing ressource in the database
// - DELETE : delete an existing ressource from the database
// - OPTIONS : get the allowed methods for the api

// the api use no trusted methods

/**
 * @description Get ressources from the database with url parameters
 * @param nb number of ressources to get (default 10)
 * @param name name of the ressource to get (default all)
 * @param unit unit of the ressource to get (default all)
 *
 * @returns Response with the ressources
 *
 */

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url)

//     const nb: number = Number(searchParams.get('nb')) ?? LIMIT_MAX;
//     const name: string | undefined = searchParams.get('name') ?? undefined;
//     const unit: string | undefined = searchParams.get('unit') ?? undefined;

//     const ressources: Ressource[] = await prisma.ressource.findMany({
//         where: {
//             name: {
//                 search: name
//             },
//             unit: {
//                 name: unit
//             }
//         },
//         take: nb,
//         include: {
//             unit: true
//         }
//     });

//     return Response.json({ ressources });

// }

interface RequestBody {
  name: string;
  unitId: number;
  pdf: File;
}

// export async function POST(request: Request) {
//     try {
//         // if no body provided, return an error
//         if (!request.body) return Response.error();

//         // the body should contain the name of the resource, unitId, and the pdf file object
//         const { name, unitId, pdf }: RequestBody = await request.json();

//         // check if the body is valid
//         if (!name || !unitId || !pdf) return new Response('Invalid body', { status: 400 });

//         // check if the unit exists
//         const existingUnit = await prisma.unit.findFirst({
//             where: {
//                 id: unitId,
//             },
//         });

//         // if the unit doesn't exist, return an error
//         if (!existingUnit) return new Response('Unit not found', { status: 404 });

//         // check if the pdf is type pdf
//         if (pdf.type !== 'application/pdf') return new Response('Invalid pdf type', { status: 400 });

//         // check if the pdf is valid
//         if (!pdf.name) return new Response('Invalid pdf', { status: 400 });

//         // check if the resource already exists
//         const existingResource = await prisma.ressource.findFirst({
//             where: {
//                 name: name,
//                 unitId: unitId,
//             },
//         });

//         // if the resource already exists, return an error
//         if (existingResource) return new Response('Resource already exists', { status: 201 });

//         // put the pdf in the private directory
//         const pdfPath = `./private/${pdf.name}`;

//         // create the file in the private directory
//         fs.writeFile(pdfPath, pdf.data, 'base64');

//         // create the new resource
//         const newResource = await prisma.ressource.create({
//             data: {
//                 name: name,
//                 unitId: unitId,
//                 urlPdf: pdfPath,
//                 urlThumbnail: '',
//             },
//         });

//         if (!newResource) return new Response('Error while creating the resource', { status: 500 });

//         return Response.json(newResource, { status: 201 });

//     } catch (error) {
//         console.error(error);
//         return Response.json({ error: 'Internal Server Error' },);
//     }
// }
export async function PUT() {}
