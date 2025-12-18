import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, PatientEntity, AppointmentEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { 
  MOCK_STATS, MOCK_ACTIVITY, MOCK_CHART_DATA, 
  MOCK_REVENUE_BY_SERVICE, MOCK_DEMOGRAPHICS, MOCK_APPOINTMENT_TRENDS 
} from "@shared/mock-data";
import type { Patient, Appointment } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'CF Workers Demo' }}));
  // --- DASHBOARD ---
  app.get('/api/dashboard', async (c) => {
    // In a real app, these would be aggregated from real data.
    // For this phase, we serve the rich mock data but ensure entities are seeded.
    await PatientEntity.ensureSeed(c.env);
    await AppointmentEntity.ensureSeed(c.env);
    return ok(c, {
      stats: MOCK_STATS,
      chartData: MOCK_CHART_DATA,
      activity: MOCK_ACTIVITY
    });
  });
  // --- ANALYTICS ---
  app.get('/api/analytics', async (c) => {
    return ok(c, {
      revenue: MOCK_REVENUE_BY_SERVICE,
      demographics: MOCK_DEMOGRAPHICS,
      trends: MOCK_APPOINTMENT_TRENDS
    });
  });
  // --- PATIENTS ---
  app.get('/api/patients', async (c) => {
    await PatientEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await PatientEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/patients', async (c) => {
    const data = await c.req.json() as Partial<Patient>;
    if (!data.name?.trim()) return bad(c, 'name required');
    const id = data.id || `P-${Math.floor(Math.random() * 10000)}`;
    const newPatient: Patient = {
      ...PatientEntity.initialState,
      ...data,
      id
    };
    return ok(c, await PatientEntity.create(c.env, newPatient));
  });
  // --- APPOINTMENTS ---
  app.get('/api/appointments', async (c) => {
    await AppointmentEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await AppointmentEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/appointments', async (c) => {
    const data = await c.req.json() as Partial<Appointment>;
    if (!data.title?.trim()) return bad(c, 'title required');
    const id = data.id || `apt-${Date.now()}`;
    const newAppointment: Appointment = {
      ...AppointmentEntity.initialState,
      ...data,
      id
    };
    return ok(c, await AppointmentEntity.create(c.env, newAppointment));
  });
  // --- EXISTING DEMO ROUTES (Preserved) ---
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/users', async (c) => {
    const { name } = (await c.req.json()) as { name?: string };
    if (!name?.trim()) return bad(c, 'name required');
    return ok(c, await UserEntity.create(c.env, { id: crypto.randomUUID(), name: name.trim() }));
  });
  app.get('/api/chats', async (c) => {
    await ChatBoardEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await ChatBoardEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/chats', async (c) => {
    const { title } = (await c.req.json()) as { title?: string };
    if (!title?.trim()) return bad(c, 'title required');
    const created = await ChatBoardEntity.create(c.env, { id: crypto.randomUUID(), title: title.trim(), messages: [] });
    return ok(c, { id: created.id, title: created.title });
  });
  app.get('/api/chats/:chatId/messages', async (c) => {
    const chat = new ChatBoardEntity(c.env, c.req.param('chatId'));
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.listMessages());
  });
  app.post('/api/chats/:chatId/messages', async (c) => {
    const chatId = c.req.param('chatId');
    const { userId, text } = (await c.req.json()) as { userId?: string; text?: string };
    if (!isStr(userId) || !text?.trim()) return bad(c, 'userId and text required');
    const chat = new ChatBoardEntity(c.env, chatId);
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.sendMessage(userId, text.trim()));
  });
  app.delete('/api/users/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) }));
  app.delete('/api/chats/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await ChatBoardEntity.delete(c.env, c.req.param('id')) }));
}