import type { Mentee, Mentor, MMRelationship } from "@shared/schema/MMRelationshipSchema";
import { MenteeSchema, MentorSchema, MMRelationshipSchema } from "@shared/schema/MMRelationshipSchema";
import { apiFetch } from "@shared/utils";
import { z } from "zod";

export const fetchMentorMenteeRelations = async (): Promise<Array<MMRelationship>> => {
  const response = await apiFetch("/api/mentorMentee/all", { method: "GET" }, MMRelationshipSchema.array());
  return response.data;
};

export const addMentorMenteeRelation = async (mentorId: string, menteeId: string): Promise<null> => {
  const response = await apiFetch(
    "/api/mentorMentee/single",
    {
      method: "POST",
      body: JSON.stringify({ mentorId, menteeId }),
    },
    z.null(),
  );

  return response.data;
};

export const getAllMentors = async (): Promise<Array<Mentor>> => {
  const response = await apiFetch("/api/mentorMentee/mentors", { method: "GET" }, MentorSchema.array());
  return response.data;
};

export const getAllMentees = async (): Promise<Array<Mentee>> => {
  const response = await apiFetch("/api/mentorMentee/mentees", { method: "GET" }, MenteeSchema.array());
  return response.data;
};

// INVITES

export const getAllMentorMenteeInvites = async (id: string): Promise<Array<MMRelationship>> => {
  const response = await apiFetch(
    `/api/mentorMentee/invite/${id}`,
    {
      method: "GET",
    },
    MMRelationshipSchema.array(),
  );
  return response.data;
};

export const addMentorMenteeInvite = async (mentorId: string, menteeId: string): Promise<null> => {
  const response = await apiFetch(
    "/api/mentorMentee/invite",
    {
      method: "POST",
      body: JSON.stringify({ mentorId, menteeId }),
    },
    z.null(),
  );
  return response.data;
};

export const acceptMentorMenteeInvite = async (inviteId: string): Promise<null> => {
  const response = await apiFetch(
    "/api/mentorMentee/accept-invite",
    {
      method: "POST",
      body: JSON.stringify({ id: inviteId }),
    },
    z.null(),
  );
  return response.data;
};

export const deleteMentorMenteeInvite = async (inviteId: string): Promise<null> => {
  const response = await apiFetch(`/api/mentorMentee/invite?${new URLSearchParams({ id: inviteId })}`, { method: "DELETE" }, z.null());
  return response.data;
};
