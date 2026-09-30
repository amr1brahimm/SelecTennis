import assert from "node:assert/strict";
import test from "node:test";
import { API_BASE_URL, apiUrl } from "./api.js";

test("uses the deployed SelecTennis API host", () => {
  assert.equal(API_BASE_URL, "https://selectennis-production.up.railway.app");
});

test("builds API endpoints with the /api prefix", () => {
  assert.equal(apiUrl("/auth/login"), "https://selectennis-production.up.railway.app/api/auth/login");
  assert.equal(apiUrl("rackets"), "https://selectennis-production.up.railway.app/api/rackets");
});