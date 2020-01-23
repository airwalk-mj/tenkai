export const SELECT_SOURCE_ENVIRONMENT = 'SELECT_SOURCE_ENVIRONMENT';
export const SELECT_TARGET_ENVIRONMENT = 'SELECT_TARGET_ENVIRONMENT';
export const SELECT_REPOSITORY = 'SELECT_REPOSITORY';
export const SELECT_FILTER_ONLY_EXCEPT = 'SELECT_FILTER_ONLY_EXCEPT';
export const SELECT_FILTER_ONLY_EXCEPT_FIELD =
  'SELECT_FILTER_ONLY_EXCEPT_FIELD';
export const ADD_CHART = 'ADD_CHART';
export const REMOVE_CHART = 'REMOVE_CHART';
export const ADD_FIELD = 'ADD_FIELD';
export const REMOVE_FIELD = 'REMOVE_FIELD';

export const COMPARE_ENV_SUCCESS = 'COMPARE_ENV_SUCCESS';
export const COMPARE_ENV_ERROR = 'COMPARE_ENV_ERROR';

export const LOAD_REPOS_SUCCESS = 'LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'LOAD_REPOS_ERROR';

export const LOAD_CHART_SUCCESS = 'LOAD_CHART_SUCCESS';
export const LOAD_CHART_ERROR = 'LOAD_CHART_ERROR';

export const LOAD_SRC_VARIABLES_SUCCESS = 'LOAD_SRC_VARIABLES_SUCCESS';
export const LOAD_SRC_VARIABLES_ERROR = 'LOAD_SRC_VARIABLES_ERROR';

export const LOAD_TAR_VARIABLES_SUCCESS = 'LOAD_TAR_VARIABLES_SUCCESS';
export const LOAD_TAR_VARIABLES_ERROR = 'LOAD_TAR_VARIABLES_ERROR';

export const UPDATE_FIELDS = 'UPDATE_FIELDS';

export const selectSourceEnvironment = selectedSrcEnv => ({
  type: SELECT_SOURCE_ENVIRONMENT,
  payload: { selectedSrcEnv }
});

export const selectTargetEnvironment = selectedTarEnv => ({
  type: SELECT_TARGET_ENVIRONMENT,
  payload: { selectedTarEnv }
});

export const selectRepository = selectedRepository => ({
  type: SELECT_REPOSITORY,
  payload: { selectedRepository }
});

export const addChart = selectedChart => ({
  type: ADD_CHART,
  payload: { selectedChart }
});

export const removeChart = selectedChart => ({
  type: REMOVE_CHART,
  payload: { selectedChart }
});

export const addField = selectedField => ({
  type: ADD_FIELD,
  payload: { selectedField }
});

export const removeField = selectedField => ({
  type: REMOVE_FIELD,
  payload: { selectedField }
});

export const selectFilterOnlyExcept = filterOnlyExceptChart => ({
  type: SELECT_FILTER_ONLY_EXCEPT,
  payload: { filterOnlyExceptChart }
});

export const selectFilterOnlyExceptField = filterOnlyExceptField => ({
  type: SELECT_FILTER_ONLY_EXCEPT_FIELD,
  payload: { filterOnlyExceptField }
});

export const compareEnvSuccess = envsDiff => ({
  type: COMPARE_ENV_SUCCESS,
  payload: { envsDiff }
});

export const compareEnvError = error => ({
  type: COMPARE_ENV_ERROR,
  payload: { error }
});

export const loadReposSuccess = repositories => ({
  type: LOAD_REPOS_SUCCESS,
  payload: { repositories }
});

export const loadReposError = error => ({
  type: LOAD_REPOS_ERROR,
  payload: { error }
});

export const loadChartsSuccess = charts => ({
  type: LOAD_CHART_SUCCESS,
  payload: { charts }
});

export const loadChartsError = error => ({
  type: LOAD_CHART_ERROR,
  payload: { error }
});

export const loadSrcVariablesSuccess = srcVariables => ({
  type: LOAD_SRC_VARIABLES_SUCCESS,
  payload: { srcVariables }
});

export const loadSrcVariablesError = error => ({
  type: LOAD_SRC_VARIABLES_ERROR,
  payload: { error }
});

export const loadTarVariablesSuccess = tarVariables => ({
  type: LOAD_TAR_VARIABLES_SUCCESS,
  payload: { tarVariables }
});

export const loadTarVariablesError = error => ({
  type: LOAD_TAR_VARIABLES_ERROR,
  payload: { error }
});
export const updateFields = fields => ({
  type: UPDATE_FIELDS,
  payload: { fields }
});
