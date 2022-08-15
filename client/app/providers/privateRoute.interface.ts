import { NextPage } from 'next';

export type TypeRoles = {
	isOnlyUser?: boolean;
};

export type NextPageAuth<P = Record<string, unknown>> = NextPage<P> & TypeRoles;

export type TypeComponentAuthFields = { Component: TypeRoles };
