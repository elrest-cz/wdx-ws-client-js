/**
 * eDesign - Runtime - Web Socket Server - Handler Module
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */


'use strict';

import {IWebSocketMessageHandler} from './IWebSocketMessageHandler';
import {Singleton as DataRefreshSchemaRequestMessageHandler} from './DataRefreshSchemaRequestMessageHandler';
import {Singleton as DataRegisterRequestMessageHandler} from './DataRegisterRequestMessageHandler';
import {Singleton as DataUnregisterRequestMessageHandler} from './DataUnregisterRequestMessageHandler';
import {Singleton as DataRegisterSchemaChangesRequestMessageHandler} from './DataRegisterSchemaChangesRequestMessageHandler';
import {Singleton as DataUnregisterSchemaChangesRequestMessageHandler} from './DataUnregisterSchemaChangesRequestMessageHandler';
import {Singleton as DataGetValueRequestMessageHandler} from './DataGetValueRequestMessageHandler';
import {Singleton as DataSetValueRequestMessageHandler} from './DataSetValueRequestMessageHandler';
import {Singleton as DataGetSchemaRequestMessageHandler} from './DataGetSchemaRequestMessageHandler';
import {Singleton as DataSetSchemaRequestMessageHandler} from './DataSetSchemaRequestMessageHandler';
import {Singleton as DataDeleteSchemaRequestMessageHandler} from './DataDeleteSchemaRequestMessageHandler';
import {Singleton as InstanceDeleteRequestMessageHandler} from './InstanceDeleteRequestMessageHandler';
import {Singleton as InstanceInfoRequestMessageHandler} from './InstanceInfoRequestMessageHandler';
import {Singleton as InstanceListRequestMessageHandler} from './InstanceListRequestMessageHandler';
import {Singleton as InstanceMonitorSubscribeRequestMessageHandler} from './InstanceMonitorSubscribeRequestMessageHandler';
import {Singleton as InstanceMonitorUnsubscribeRequestMessageHandler} from './InstanceMonitorUnsubscribeRequestMessageHandler';
import {Singleton as InstanceLogSubscribeRequestMessageHandler} from './InstanceLogSubscribeRequestMessageHandler';
import {Singleton as InstanceLogUnsubscribeRequestMessageHandler} from './InstanceLogUnsubscribeRequestMessageHandler';
import {Singleton as InstanceRestartRequestMessageHandler} from './InstanceRestartRequestMessageHandler';
import {Singleton as InstanceStartRequestMessageHandler} from './InstanceStartRequestMessageHandler';
import {Singleton as InstanceStopRequestMessageHandler} from './InstanceStopRequestMessageHandler';
import {Singleton as InstanceSaveRequestMessageHandler} from './InstanceSaveRequestMessageHandler';
import {Singleton as InstanceWhoIsRequestMessageHandler} from './InstanceWhoIsRequestMessageHandler';
import {Singleton as PackageInstallRequestMessageHandler} from './PackageInstallRequestMessageHandler';
import {Singleton as PackageUninstallRequestMessageHandler} from './PackageUninstallRequestMessageHandler';
import {Singleton as ScriptBrowseRequestMessageHandler} from './ScriptBrowseRequestMessageHandler';
import {Singleton as ScriptSaveRequestMessageHandler} from './ScriptSaveRequestMessageHandler';
import {Singleton as ScriptDeleteRequestMessageHandler} from './ScriptDeleteRequestMessageHandler';
import {Singleton as RuntimeInfoRequestMessageHandler} from './RuntimeInfoRequestMessageHandler';
import {Singleton as RuntimeMonitorSubscribeRequestMessageHandler} from './RuntimeMonitorSubscribeRequestMessageHandler';
import {Singleton as RuntimeMonitorUnsubscribeRequestMessageHandler} from './RuntimeMonitorUnsubscribeRequestMessageHandler';

import {Singleton as TrendingStartRequestMessageHandler} from './TrendingStartRequestMessageHandler';
import {Singleton as TrendingStopRequestMessageHandler} from './TrendingStopRequestMessageHandler';

export {
  IWebSocketMessageHandler,

  DataRefreshSchemaRequestMessageHandler,
  DataRegisterRequestMessageHandler,
  DataRegisterSchemaChangesRequestMessageHandler,
  DataUnregisterRequestMessageHandler,
  DataUnregisterSchemaChangesRequestMessageHandler,
  DataGetValueRequestMessageHandler,
  DataSetValueRequestMessageHandler,
  DataGetSchemaRequestMessageHandler,
  DataSetSchemaRequestMessageHandler,
  DataDeleteSchemaRequestMessageHandler,

  InstanceDeleteRequestMessageHandler,
  InstanceInfoRequestMessageHandler,
  InstanceListRequestMessageHandler,
  InstanceMonitorSubscribeRequestMessageHandler,
  InstanceMonitorUnsubscribeRequestMessageHandler,
  InstanceLogSubscribeRequestMessageHandler,
  InstanceLogUnsubscribeRequestMessageHandler,
  InstanceRestartRequestMessageHandler,
  InstanceStartRequestMessageHandler,
  InstanceStopRequestMessageHandler,
  InstanceSaveRequestMessageHandler,
  InstanceWhoIsRequestMessageHandler,

  PackageInstallRequestMessageHandler,
  PackageUninstallRequestMessageHandler,

  ScriptBrowseRequestMessageHandler,
  ScriptSaveRequestMessageHandler,
  ScriptDeleteRequestMessageHandler,

  RuntimeInfoRequestMessageHandler,
  RuntimeMonitorSubscribeRequestMessageHandler,
  RuntimeMonitorUnsubscribeRequestMessageHandler,

  TrendingStartRequestMessageHandler,
  TrendingStopRequestMessageHandler,
};