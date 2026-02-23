-- ARGV[1] = now (ms)
-- ARGV[2] = capacity (float)
-- ARGV[3] = refill_per_ms (float)
-- ARGV[4] = tokens_to_consume (float)
-- ARGV[5] = ttl_ms (milliseconds for key expiry)
-- KEYS[1] = key

local key = KEYS[1]
local now = tonumber(ARGV[1])
local capacity = tonumber(ARGV[2])
local refill_per_ms = tonumber(ARGV[3])
local consume = tonumber(ARGV[4])
local ttl_ms = tonumber(ARGV[5])

local data = redis.call("HMGET", key, "tokens", "ts")
local tokens = tonumber(data[1])
local ts = tonumber(data[2])

if tokens == nil then
  tokens = capacity
  ts = now
end

local elapsed = math.max(0, now - ts)
local refill = elapsed * refill_per_ms
tokens = math.min(capacity, tokens + refill)
if tokens < consume then
  redis.call("HMSET", key, "tokens", tokens, "ts", now)
  redis.call("PEXPIRE", key, ttl_ms)
  return {0, tokens}
else
  tokens = tokens - consume
  redis.call("HMSET", key, "tokens", tokens, "ts", now)
  redis.call("PEXPIRE", key, ttl_ms)
  return {1, tokens}
end
