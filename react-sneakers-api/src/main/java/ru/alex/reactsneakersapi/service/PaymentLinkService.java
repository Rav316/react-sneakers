package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentLinkService {
    private final RedisTemplate<String, String> redisTemplate;
    private static final Duration LINK_TTL = Duration.ofMinutes(15);
    private static final Duration RESEND_LOCK_TTL = Duration.ofMinutes(5);


    public String createPaymentLink(Integer userId, Integer orderId) {
        String resendLockKey = "resend_lock:" + userId + ":" + orderId;
        if (redisTemplate.hasKey(resendLockKey)) {
            throw new ResponseStatusException(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "Sending too frequently. Try again in 5 minutes."
            );
        }

        String uuid = UUID.randomUUID().toString();
        String paymentLinkKey = "payment_link:" + uuid;

        redisTemplate.opsForValue().set(paymentLinkKey, orderId.toString(), LINK_TTL);

        redisTemplate.opsForValue().set(resendLockKey, "1", RESEND_LOCK_TTL);
        return uuid;
    }

    public String validatePaymentLink(String uuid) {
        String paymentLinkKey = "payment_link:" + uuid;
        String orderId = redisTemplate.opsForValue().get(paymentLinkKey);
        if (orderId == null) {
            throw new IllegalArgumentException("The link is outdated or invalid.");
        }
        return orderId;
    }
}
