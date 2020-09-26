/**
 * Copyright Microsoft Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fixtures as baseFixtures } from '@playwright/test-runner';

type PlatformParameters = {
  platform: 'win32' | 'linux' | 'darwin'
};

type PlatformWorkerFixtures = {
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
};

export const fixtures = baseFixtures
    .declareParameters<PlatformParameters>()
    .declareWorkerFixtures<PlatformWorkerFixtures>();
const { defineWorkerFixture, defineParameter, generateParametrizedTests } = fixtures;

export const options = {
  MAC: (parameters: PlatformParameters) => parameters.platform === 'darwin',
  LINUX: (parameters: PlatformParameters) => parameters.platform === 'linux',
  WIN: (parameters: PlatformParameters) => parameters.platform === 'win32',
};

defineParameter('platform', 'Operating system', process.platform as ('win32' | 'linux' | 'darwin'));

generateParametrizedTests(
    'platform',
    process.env.PWTESTREPORT ? ['win32', 'darwin', 'linux'] : [process.platform as ('win32' | 'linux' | 'darwin')]);

defineWorkerFixture('isWindows', async ({platform}, test) => {
  await test(platform === 'win32');
});

defineWorkerFixture('isMac', async ({platform}, test) => {
  await test(platform === 'darwin');
});

defineWorkerFixture('isLinux', async ({platform}, test) => {
  await test(platform === 'linux');
});