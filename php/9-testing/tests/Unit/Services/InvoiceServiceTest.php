<?php
declare(strict_types=1);

namespace Tests\Unit\Services;

use App\Services\EmailService;
use PHPUnit\Framework\TestCase;
use App\Services\InvoiceService;
use App\Services\PaymentGatewayService;
use App\Services\SalesTaxService;

class InvoiceServiceTest extends TestCase
{
    /** @test */
    public function it_processes_invoice(): void
    {

        $salesTaxServiceMock = $this->createMock(SalesTaxService::class);
        $getawayServiceMock = $this->createMock(PaymentGatewayService::class);
        $emailServiceMock = $this->createMock(EmailService::class);

        // var_dump($salesTaxServiceMock->calculate(44, [])); # float(0) - NULL casted to float

        $getawayServiceMock->method('charge')->willReturn(true); # instead of the default NULL -> false

        # given invoice service
        $invoiceService = new InvoiceService($salesTaxServiceMock, $getawayServiceMock, $emailServiceMock);

        $customer = ['name' => 'Homer Simpson'];
        $amount = 152;

        # when process is called
        $result = $invoiceService->process($customer, $amount);

        # then assert invoice is processed successfully
        $this->assertTrue($result);
    }

    /** @test */
    public function it_sends_receipt_email_when_invoice_is_processed(): void
    {
        $salesTaxServiceMock = $this->createMock(SalesTaxService::class);
        $getawayServiceMock = $this->createMock(PaymentGatewayService::class);
        $emailServiceMock = $this->createMock(EmailService::class);

        $getawayServiceMock->method('charge')->willReturn(true);

        $emailServiceMock
            ->expects($this->once())
            ->method('send')
            ->with(['name' => 'Homer Simpson'], 'receipt');

        # given invoice service
        $invoiceService = new InvoiceService($salesTaxServiceMock, $getawayServiceMock, $emailServiceMock);

        $customer = ['name' => 'Homer Simpson'];
        $amount = 152;

        # when process is called
        $result = $invoiceService->process($customer, $amount);

        # then assert invoice is processed successfully
        $this->assertTrue($result);
    }
}