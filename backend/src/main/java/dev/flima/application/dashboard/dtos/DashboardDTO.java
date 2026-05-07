package dev.flima.application.dashboard.dtos;

public record DashboardDTO(
    Long totalVisitors,
    String uptime,
    Long unreadMessages
) {}
