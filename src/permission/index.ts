import { rule, shield, and, or } from 'graphql-shield';
import { verifyToken } from '../utils/jwt-decoder.js';
import { GraphQLError } from 'graphql';
// Authenticated User
const rules = {
  // This is the code for checking permission on an endpoint
  isAuthenticatedUser: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    if (authUser == 'jwt expired') return new GraphQLError('Session Expired');
    if (authUser == 'invalid token') return new GraphQLError('Invalid Token');
    if (authUser) return Boolean(authUser);
  }),
  isAdmin: rule({ cache: 'contextual' })(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    return authUser['role'][0] == 'super admin' || authUser['role'] == 'admin';
  }),
  isUser: rule()(async (_parent, { user_id }, context) => {
    const authUser = verifyToken(context.req);
    if (authUser['id'] == user_id) {
      return Boolean(authUser);
    }
  }),
  canViewSpecialization: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (
      authUser.role[0] == 'super admin' ||
      authUser.role == 'admin' ||
      authUser
    )
      return true;
    return (
      access.permissions.settings?.talent_management?.view_specializations ||
      false
    );
  }),
  canManageSpecialization: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return (
      access.permissions.settings?.talent_management?.manage_specializations ||
      false
    );
  }),
  canViewClient: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.resource_manager?.view_client_manager || false;
  }),

  canViewOrganizations: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.settings.general?.view_organizations || false;
  }),

  canManageOrganizations: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.settings.general?.manage_organizations || false;
  }),

  canManageClient: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.resource_manager?.manage_client_manager || false;
  }),
  canViewSkill: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (
      authUser.role[0] == 'super admin' ||
      authUser.role == 'admin' ||
      authUser
    )
      return true;
    return access.permissions.resource_manager?.view_skills_manager || false;
  }),
  canManageSkill: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.resource_manager?.manage_skills_manager || false;
  }),

  canViewProject: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.resource_manager?.view_project_manager || false;
  }),

  canManageProject: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.resource_manager?.manage_project_manager || false;
  }),

  canViewOffice: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.settings?.general?.view_office || false;
  }),

  canManageOffice: rule()(async (_parent, _args, context) => {
    const authUser = verifyToken(context.req);
    const access = await context.dataSources.AuthDataSource.getPermissions(
      authUser?.access_level_id,
    );
    if (authUser.role[0] == 'super admin' || authUser.role == 'admin')
      return true;
    return access.permissions.settings?.general?.manage_office || false;
  }),
};

export const permissions = shield(
  {
    Query: {
      //Specialization
      specializations: and(
        rules.isAuthenticatedUser,
        rules.canViewSpecialization,
      ),
      getSpecialization: and(
        rules.isAuthenticatedUser,
        rules.canViewSpecialization,
      ),
      filterSpecialization: and(
        rules.isAuthenticatedUser,
        rules.canViewSpecialization,
      ),
      selectSpecializations: and(rules.isAuthenticatedUser),
      //Skill
      skills: and(rules.isAuthenticatedUser, rules.canViewSkill),
      skill: and(rules.isAuthenticatedUser, rules.canViewSkill),
      filterSkill: and(rules.isAuthenticatedUser, rules.canViewSkill),
      selectSkills: and(rules.isAuthenticatedUser),
      //Client
      clients: and(
        rules.isAuthenticatedUser,
        or(rules.canViewClient, rules.canViewOrganizations),
      ),
      client: and(
        rules.isAuthenticatedUser,
        or(rules.canViewClient, rules.canViewOrganizations),
      ),
      filterClient: and(
        rules.isAuthenticatedUser,
        or(rules.canViewClient, rules.canViewOrganizations),
      ),
      getParentOrganizations: and(
        rules.isAuthenticatedUser,
        rules.canViewClient,
        rules.canViewOrganizations,
      ),
      getMutipleClients: and(rules.isAuthenticatedUser, rules.canViewClient),
      selectClients: and(rules.isAuthenticatedUser),
      //Project
      projects: and(rules.isAuthenticatedUser, rules.canViewProject),
      project: and(rules.isAuthenticatedUser, rules.canViewProject),
      user_on_project: and(rules.isAuthenticatedUser, rules.canViewProject),
      searchProject: and(rules.isAuthenticatedUser, rules.canViewProject),
      filterProjectStatus: and(rules.isAuthenticatedUser, rules.canViewProject),
      filterProjectDetails: and(
        rules.isAuthenticatedUser,
        rules.canViewProject,
      ),
      filterProjectDetailsWithStaff: and(
        rules.isAuthenticatedUser,
        rules.canViewProject,
      ),
      globalStaffing: and(rules.isAuthenticatedUser, rules.canViewProject),
      userCurrentProject: and(rules.isAuthenticatedUser, rules.canViewProject),
      selectProjects: and(rules.isAuthenticatedUser),
      //Office
      listAllOffices: and(rules.isAuthenticatedUser, rules.canViewOffice),
      getOffice: and(rules.isAuthenticatedUser, rules.canViewOffice),
      filterOffice: and(rules.isAuthenticatedUser, rules.canViewOffice),
      selectOffices: and(rules.isAuthenticatedUser),
    },

    Mutation: {
      //Specialization
      addSpecialization: and(
        rules.isAuthenticatedUser,
        rules.canManageSpecialization,
      ),
      updateSpecialization: and(
        rules.isAuthenticatedUser,
        rules.canManageSpecialization,
      ),
      archiveSpecialization: and(
        rules.isAuthenticatedUser,
        rules.canManageSpecialization,
      ),
      //Skills
      addSkill: and(rules.isAuthenticatedUser, rules.canManageSkill),
      updateSkill: and(rules.isAuthenticatedUser, rules.canManageSkill),
      archiveSkill: and(rules.isAuthenticatedUser, rules.canManageSkill),
      //Client
      addClient: and(
        rules.isAuthenticatedUser,
        or(rules.canManageOrganizations, rules.canManageClient),
      ),
      updateClient: and(
        rules.isAuthenticatedUser,
        or(rules.canManageClient, rules.canManageOrganizations),
      ),
      archiveClient: and(
        rules.isAuthenticatedUser,
        or(rules.canManageClient, rules.canManageOrganizations),
      ),
      //Projects
      addProject: and(rules.isAuthenticatedUser, rules.canManageProject),
      updateProject: and(rules.isAuthenticatedUser, rules.canManageProject),
      archiveProject: and(rules.isAuthenticatedUser, rules.canManageProject),
      confirmStaff: and(rules.isAuthenticatedUser, rules.canManageProject),
      bulkStaffConfirm: and(rules.isAuthenticatedUser, rules.canManageProject),
      removeStaff: and(rules.isAuthenticatedUser, rules.canManageProject),
      addMoreStaffToProject: and(
        rules.isAuthenticatedUser,
        rules.canManageProject,
      ),
      updateProjectStatus: and(
        rules.isAuthenticatedUser,
        rules.canManageProject,
      ),
      removeDeactivatedStaff: and(
        rules.isAuthenticatedUser,
        rules.canManageProject,
      ),
      updateProjectConfirmationStatus: and(
        rules.isAuthenticatedUser,
        rules.canManageProject,
      ),
      updateProjectStaffingStatus: and(
        rules.isAuthenticatedUser,
        rules.canManageProject,
      ),
      //Offices
      addOffice: and(rules.isAuthenticatedUser, rules.canManageOffice),
      updateOffice: and(rules.isAuthenticatedUser, rules.canManageOffice),
      archiveOffice: and(rules.isAuthenticatedUser, rules.canManageOffice),
    },
  },
  { allowExternalErrors: true },
);
