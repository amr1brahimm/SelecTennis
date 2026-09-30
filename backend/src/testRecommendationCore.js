const assert = require('assert');
const e = require('./services/recommendationEngine');

const config = { parameterMap: {
  neutral_head_size:100, neutral_stiffness:64, neutral_balance_points_hl:2,
  neutral_static_weight_g:280, neutral_swingweight:335,
  female_static_weight_cap_g:300, female_swingweight_cap:320,
  characteristics_score_config:{neutral_target:5,minimum_target:1,maximum_target:10,
    components:['power','control','spin','forgiveness','maneuverability','stability','feel_touch','comfort']},
}};

const health = e.buildHealthState([87,89,92], [
  {area_code:'wrist',classification:'previous_injury'},
  {area_code:'shoulder',classification:'physical_discomfort'},
]);
assert.equal(health.issueType,'both');
assert.deepEqual(health.affectedAreas,['wrist','shoulder']);

const protectedResult = e.applyHealthRules(
  {head_size:100,stiffness:64,balance:-2,unstrung_weight:300,swingweight:340},
  health,{age:26,gender:'male'},config
);
assert.equal(protectedResult.caps.unstrung_weight,300);
assert.equal(protectedResult.caps.swingweight,325);
assert(protectedResult.targets.unstrung_weight < 300);
assert(protectedResult.targets.swingweight < 340);
assert(protectedResult.targets.balance < -2);
assert(protectedResult.targets.stiffness < 64);

assert.equal(e.scoreStringPattern('16x20','16x20'),10);
assert.equal(e.scoreStringPattern('16x18','18x20'),0);
assert.equal(e.scoreTechnicalDifference('head_size',100,101),8);
assert.equal(e.scoreTechnicalDifference('stiffness',64,66),9);
assert.equal(e.scoreTechnicalDifference('unstrung_weight',280,290),9);
assert.equal(e.scoreTechnicalDifference('swingweight',335,341),9);
assert.equal(e.calculateCharacteristicCompatibility(7,5),8);

const femaleTeen = e.applyHealthRules(
  {head_size:100,stiffness:70,balance:-2,unstrung_weight:320,swingweight:340},
  {issueType:'none',classifications:[]},{age:16,gender:'female'},config
);
assert.equal(femaleTeen.caps.unstrung_weight,300);
assert.equal(femaleTeen.caps.swingweight,320);
assert.equal(femaleTeen.caps.stiffness,64);
assert.equal(femaleTeen.targets.unstrung_weight,300);
assert.equal(femaleTeen.targets.swingweight,320);
assert.equal(femaleTeen.targets.stiffness,64);

console.log('✓ Health state');
console.log('✓ Health protection + caps');
console.log('✓ Female/age hard caps');
console.log('✓ String pattern compatibility');
console.log('✓ Technical compatibility');
console.log('✓ Characteristic compatibility');
console.log('ALL CORE TESTS PASSED');
