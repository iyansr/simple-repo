import axios from 'axios';
import type { GithubRepo, GithubRepoRaw, GithubUser } from '@/modules/types';

export const getGithubUser = async (
  username: string,
  token?: string | null,
) => {
  const response = await axios.request<GithubUser>({
    method: 'GET',
    baseURL: 'https://api.github.com',
    url: `/users/${username}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return response.data;
};

const getLanguageColor = async () => {
  const response = await axios.request<{ [x: string]: { color: string } }>({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json',
  });

  return response.data;
};

export const getGithubUserRepositories = async (
  username: string,
  token?: string | null,
) => {
  const response = await axios.request<GithubRepoRaw[]>({
    method: 'GET',
    baseURL: 'https://api.github.com',
    url: `/users/${username}/repos`,
    params: {
      per_page: 6,
      sort: 'updated',
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const langColor = await getLanguageColor();

  return response.data.map((data) => ({
    id: data.id,
    description: data.description,
    name: data.name,
    updated_at: data.updated_at,
    visibility: data.visibility,
    language: {
      name: data.language,
      color: langColor[data.language]?.color || '#f000',
    },
  })) as GithubRepo[];
};
