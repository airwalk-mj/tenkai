import * as types from './actionTypes';
import * as services from 'services/simpleDeploy';
import * as global from 'stores/global/actions';

export function loadRepositories() {
  return async dispatch => {
    try {
      dispatch(global.beginLoad());

      const result = await services.loadRepositories();
      const repositories = result.data.repositories;
      const repos = repositories.map(e => {
        const item = {
          value: e.name,
          label: e.name
        };
        return item;
      });

      dispatch(global.successWithParam(types.loadReposSuccess, repos));
    } catch (e) {
      dispatch(global.handleError(e, types.loadReposError));
    }
  };
}

export function loadCharts(repo, allVersions) {
  return async dispatch => {
    try {
      dispatch(global.beginLoad());

      const result = await services.loadCharts(repo, allVersions);
      const charts = result.data.charts;
      let repos = [];

      if (!!result && !!result.data && !!result.data.charts) {
        repos = charts.map(e => {
          let chartNameVersion = e.name + ' - ' + e.chartVersion;
          const item = {
            value: e.name,
            label: chartNameVersion
          };
          return item;
        });
      }

      dispatch(global.successWithParam(types.loadChartsSuccess, repos));
    } catch (e) {
      dispatch(global.handleError(e, types.loadChartsError));
    }
  };
}

export function loadVariables(envId, scope, callback) {
  return async dispatch => {
    try {
      dispatch(global.beginLoad());

      const result = await services.loadVariables(envId, scope);
      const variables = result.data.Variables;

      dispatch(types.loadVariablesSuccess(variables, findImage(variables)));
      dispatch(global.hideSpinner());
      callback();
    } catch (e) {
      dispatch(global.handleError(e, types.loadVariablesError));
    }
  };
}

function findImage(variables) {
  if (!!variables) {
    let imageVar = variables.find(e => e.name === 'image.repository');
    if (!!imageVar) {
      return imageVar.value;
    }
  }
  return '';
}

export function loadDockerTags(imageName) {
  return async dispatch => {
    try {
      dispatch(global.beginLoad());

      const result = await services.loadDockerTags(imageName);
      const dockerTags = result.data.tags;
      const items = dockerTags.map(e => {
        const item = {
          value: e.tag,
          label: e.tag
        };
        return item;
      });

      dispatch(global.successWithParam(types.loadDockerTagsSuccess, items));
    } catch (e) {
      dispatch(global.handleError(e, types.loadDockerTagsError));
    }
  };
}

export function saveVariables(
  chartName,
  dockerTag,
  environmentId,
  installCallback
) {
  return async dispatch => {
    try {
      dispatch(global.beginLoad());

      const data = [
        {
          scope: chartName,
          name: 'image.tag',
          value: dockerTag,
          environmentId: environmentId
        }
      ];

      await services.saveVariables(data);
      dispatch(global.handleSuccess(types.saveVariablesSuccess));
      installCallback();
    } catch (e) {
      dispatch(global.handleError(e, types.saveVariablesError));
    }
  };
}

export function install(envId, releaseName, chartName, chartVersion) {
  return async dispatch => {
    try {
      dispatch(global.beginLoad());

      const data = {
        environmentId: envId,
        chart: chartName,
        chartVersion: chartVersion,
        name: releaseName
      };

      await services.install(data);

      dispatch(global.handleSuccess(types.installSuccess));
      dispatch(global.successDefaultMessage());
    } catch (e) {
      dispatch(global.handleError(e, types.installError));
    }
  };
}

export function selectRepository(selectedRepository) {
  return async dispatch => {
    dispatch(types.selectRepository(selectedRepository));
  };
}

export function selectChart(selectedChart) {
  return async dispatch => {
    dispatch(types.selectChart(selectedChart));
  };
}

export function selectTag(selectedTag) {
  return async dispatch => {
    dispatch(types.selectTag(selectedTag));
  };
}
