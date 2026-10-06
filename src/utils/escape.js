/*
 * Copyright CIB software GmbH and/or licensed to CIB software GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. CIB software licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * Escapes the regular expression metacharacters in a value so it can be used as
 * a literal inside a RegExp. Without this a user-supplied search term such as
 * '(' makes the RegExp constructor throw.
 *
 * Prefers the built-in RegExp.escape (ES2025) and falls back to replacing the
 * metacharacters by hand on engines that do not have it yet. The built-in
 * escapes more characters than the fallback - among others it hex-escapes a
 * leading letter or digit - so the two produce different strings for the same
 * input. Both match the same literal, which is all this is used for, so callers
 * must not depend on the exact output.
 */
export function escapeRegExp(value) {
  if (value === null || value === undefined) return ''
  const text = String(value)
  if (typeof RegExp.escape === 'function') return RegExp.escape(text)
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
