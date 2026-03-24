import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function addLeadToNotion(data: any) {
  if (!databaseId || databaseId === 'your_db_id') {
    console.warn('Missing or invalid NOTION_DATABASE_ID - skipping Notion integration');
    return;
  }
  if (!process.env.NOTION_TOKEN || process.env.NOTION_TOKEN === 'your_token') {
    console.warn('Missing or invalid NOTION_TOKEN - skipping Notion integration');
    return;
  }

  try {
    // Constructing a detailed notes string with all the other form data
    const notesContent = `
Builder Type: ${data.builderType || 'N/A'}
Website: ${data.website || 'N/A'}
Primary Color: ${data.primaryColor || 'N/A'}
Secondary Color: ${data.secondaryColor || 'N/A'}
Tone: ${data.tone || 'N/A'}
Special Instructions: ${data.specialInstructions || 'N/A'}
Coverage Categories: ${data.coverageCategories || 'N/A'}
Integration: ${data.integration || 'N/A'}
Platforms: ${data.platforms || 'N/A'}
Property Count: ${data.propertyCount || 'N/A'}
    `.trim();

    console.log("--> Notion Config:", { databaseId, hasToken: !!process.env.NOTION_TOKEN });
    console.log("--> Attempting to create Notion page with properties mapped...");

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // The default Title property (Aa) has been renamed to 'Contact Name'
        'Contact Name': {
          title: [
            {
              text: {
                content: data.contactName || 'No Contact Name',
              },
            },
          ],
        },
        // The column named 'Text' will hold the Company Name
        'Text': {
          rich_text: [
            {
              text: {
                content: data.companyName || 'Unknown Company',
              },
            },
          ],
        },
        'Email': {
          email: data.email || null,
        },
        'Phone': {
          phone_number: data.phone || null,
        },
        'Notes': {
          rich_text: [
            {
              text: {
                content: notesContent.substring(0, 2000), // Notion text limit is 2000 chars per block
              },
            },
          ],
        }
      },
    });
    console.log('--> Successfully added lead to Notion', response.id);
    return response;
  } catch (error: any) {
    console.error('--> NOTION API ERROR DETAILS:');
    if (error.body) {
       console.error(error.body); // Notion API specifically sends the useful message in `error.body`
    } else {
       console.error(error);
    }
  }
}
