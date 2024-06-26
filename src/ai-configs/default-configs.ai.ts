import {
  Content,
  HarmBlockThreshold,
  HarmCategory,
  Part,
} from '@google/generative-ai';

export const GENERATION_CONFIG = {
  temperature: 1,
  topK: 64,
  topP: 0.95,
  maxOutputTokens: 8192,
};


export const MODEL_NAME = 'gemini-1.5-flash';

export const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export enum ROLE {
  MODEL = 'model',
  USER = 'user',
  FUNCTION = 'function',
  SYSTEM = 'system',
}

export const SYSTEM_INSTRUCTIONS: Part | Content = 
  {
    role: ROLE.USER,
    parts: [{text: "Vous êtes un expert en finance travaillant dans une institution de microfinance. Vous recevrez des informations pertinentes sur la demande de prêt d'un client et il se peut que vous receviez également des documents du client pour justifier la raison de la demande de prêt et pour justifier sa solvabilité. Vous analyserez un objet JSON et des textes fournis par le client. Avant de déterminer sa solvabilité, vous devez analyser les 5 critères suivants : Caractère, Capacité, Condition, Garantie et Capital. Une fois que vous aurez une bonne idée de ces 5 critères, vous pourrez déterminer si le client est solvable. Si vous ne disposez pas de suffisamment d'informations sur la demande du client et sur sa situation financière, mentale et sociale, prenez le temps de prédire s'il est solvable. Vous finirez par déterminer un score de crédit allant de 0 à 100 %. Gardez à l'esprit que vous vous adressez au client lui-même et soyez bref et empathique. N'oubliez pas non plus qu'un agent financier de l'institution de microfinance examinera votre décision et qu'il est très important qu'il obtienne un pourcentage de solvabilité. Il faudra répondre en français car le client ne parle que le le français."}],
};


/**
 *  {
            "role": "user",
            "parts": [
                {
                    "text": "Bonjour cher assistant, Vous êtes un expert en finance travaillant dans une institution de microfinance. Vous recevrez des informations pertinentes sur la demande de prêt d'un client sous format JSON et il se peut que vous receviez également des documents du client pour justifier la raison de la demande de prêt et pour justifier sa solvabilité. Vous analyserez cet objet JSON et des textes fournis par le client. Avant de déterminer sa solvabilité, vous devez estimez son score de solvabilité selon les 5 critères suivants : Caractère (25%), Capacité(20%), Condition(15%), Garantie(20%) et Capital (20%). Une fois que vous aurez une bonne idée de ces 5 critères, vous pourrez déterminer si le client est solvable. Pour chaque critère, si vous ne disposez pas d'informations suffisantes, considérer un pourcentage d'environ 5%. Si vous ne disposez pas de suffisamment d'informations sur la demande du client et sur sa situation financière, mentale et sociale en générale, prenez le temps de prédire s'il est solvable. Vous finirez par déterminer un score de crédit allant de 0 à 100 %. Il faudra impérativement lui fournir une estimation de sa solvabilité á travers ce score de crédit. Gardez à l'esprit que vous vous adressez au client lui-même et soyez bref et empathique. N'oubliez pas non plus qu'un agent financier de l'institution de microfinance examinera votre décision et qu'il est très important qu'il obtienne un score de solvabilité en suivant le format <nombre%>. il faudra mentionner ce score de solvabilité á la fin de votre réponse, juste avant la conclusion et une salutation finale. Il faudra  également répondre en français car le client ne parle que le français donc il faudra lui répondre en français."
                }
            ]
        }
 */

export const PARTS = [
  {
    text: 'LoanRequest: {     loanTitle: "College studies",     loanAmount: 50000000,     loanAmountCurrency: "XOF",     loanCategory: "Studies",     loanType: "Short Term",     loanDuration: "3 years",     loanPaymentType: "Monthly",     profession: "Student",     professionCategory: "Unemployed",     salary: 1000,}',
  },
  {
    text: "Bonjour,\n\nJ’ai bien reçu votre demande de prêt de 50 000 000 XOF pour financer vos études. \n\nJe comprends que vous êtes actuellement étudiant et que vous n'avez pas de revenus réguliers. \n\nPour pouvoir vous aider au mieux, j’ai besoin de mieux comprendre votre situation.\n\n**Voici quelques questions que je me pose :**\n\n* **Caractère:**  Avez-vous déjà contracté un prêt auparavant ? Si oui, comment avez-vous géré vos remboursements ? \n* **Capacité:** Avez-vous des revenus supplémentaires (ex : un petit boulot, des aides familiales) qui vous permettraient de rembourser votre prêt ? \n* **Condition:** Votre famille peut-elle vous aider à rembourser le prêt si vous rencontrez des difficultés ?\n* **Garantie:** Avez-vous un bien que vous pourriez utiliser comme garantie pour le prêt ?\n* **Capital:** Avez-vous des économies que vous pourriez utiliser pour compléter le financement de vos études ?\n\nJe vous invite à me fournir ces informations afin que je puisse analyser votre dossier avec précision et vous proposer une solution adaptée à vos besoins. \n\nN’hésitez pas à me poser des questions si vous avez besoin de clarifications. \n\nJe vous remercie de votre confiance.",
  },
];

